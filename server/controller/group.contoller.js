import client from "../helpers/prismaClient";

export async function createGroup(c) {
   const { newGroupName: groupName, selectedMembers: groupMembers } =
      await c.req.json();
   const { userID: creatorId } = c.get("jwtPayload");

   try {
      // Todo create an empty group then create the memberships and feed then to the group
      // * Wrap the two operations in a transaction to provide fall back incase any fails

      const newPopulatedGroup = client.$transaction(async (tx) => {
         // create empty group with just a name
         const newEmptyGroup = await tx.group.create({
            data: {
               groupName,
            },
         });

         const id = newEmptyGroup.groupId;

         // create Admin membership
         const admin = await tx.groupMember.create({
            data: {
               userId: creatorId,
               groupId: id,
               role: "admin",
            },
         });

         // populate the rest of the group members
         const membersData = groupMembers.map((userId) => ({
            groupId: id,
            userId,
         }));

         const members = await tx.groupMember.createManyAndReturn({
            data: membersData,
         });

         return { group: newEmptyGroup, admin, members };
      });

      return c.json(
         {
            message: `Group "${groupName}" created successfully`,
            group: newPopulatedGroup,
         },
         201,
      );
   } catch (error) {
      console.log(error);
      return c.json({ error: `Failed to create group ${groupName}` }, 500);
   }
}

export async function getUserGroups(c) {
   const { userID: userId } = c.get("jwtPayload");
   try {
      const userGroups = await client.group.findMany({
         where: { groupMembers: { some: { userId } } },
         include: {
            _count: {
               select: { groupMembers: true },
            },
         },
      });

      // Fetch last message for each group
      const groupsWithLastMessage = await Promise.all(
         userGroups.map(async (group) => {
            const lastMessage = await client.conversation.findFirst({
               where: {
                  groupId: group.groupId,
                  messageType: "group",
               },
               orderBy: { createdAt: "desc" },
               select: {
                  content: true,
                  createdAt: true,
               },
            });
            return {
               ...group,
               lastMessage: lastMessage?.content || null,
               lastMessageTime: lastMessage?.createdAt || null,
            };
         }),
      );

      return c.json(
         {
            message: "Successfully fetched User groups",
            userGroups: groupsWithLastMessage,
         },
         200,
      );
   } catch (error) {
      console.log(error);
      return c.json({ error: "Failed to fetch User groups" });
   }
}

// Get group members with their roles
export async function getGroupMembers(c) {
   const groupId = c.req.param("id");
   const { userID: userId } = c.get("jwtPayload");

   try {
      // Check if user is a member of this group
      const isMember = await client.groupMember.findUnique({
         where: { userId_groupId: { userId, groupId } },
      });

      if (!isMember) {
         return c.json({ error: "You are not a member of this group" }, 403);
      }

      const members = await client.groupMember.findMany({
         where: { groupId },
         include: {
            user: {
               select: {
                  userID: true,
                  userName: true,
                  email: true,
                  imageURL: true,
                  role: true,
               },
            },
         },
      });

      // Check if current user is admin
      const isAdmin = isMember.role === "admin";

      return c.json(
         {
            message: "Successfully fetched group members",
            members,
            isAdmin,
         },
         200,
      );
   } catch (error) {
      console.log(error);
      return c.json({ error: "Failed to fetch group members" }, 500);
   }
}

// Add member to group (admin only)
export async function addGroupMember(c) {
   const groupId = c.req.param("id");
   const { userId: newMemberId } = await c.req.json();
   const { userID: adminId } = c.get("jwtPayload");

   try {
      // Check if requester is admin
      const adminMember = await client.groupMember.findUnique({
         where: { userId_groupId: { userId: adminId, groupId } },
      });

      if (!adminMember || adminMember.role !== "admin") {
         return c.json({ error: "Only admins can add members" }, 403);
      }

      // Check if user is already a member
      const existing = await client.groupMember.findUnique({
         where: { userId_groupId: { userId: newMemberId, groupId } },
      });

      if (existing) {
         return c.json({ error: "User is already a member" }, 400);
      }

      const newMember = await client.groupMember.create({
         data: {
            userId: newMemberId,
            groupId,
            role: "member",
         },
         include: {
            user: {
               select: {
                  userID: true,
                  userName: true,
                  email: true,
                  imageURL: true,
               },
            },
         },
      });

      return c.json(
         {
            message: "Member added successfully",
            member: newMember,
         },
         201,
      );
   } catch (error) {
      console.log(error);
      return c.json({ error: "Failed to add member" }, 500);
   }
}

// Remove member from group (admin only, or self-leave)
export async function removeGroupMember(c) {
   const groupId = c.req.param("id");
   const memberId = c.req.param("memberId");
   const { userID: requesterId } = c.get("jwtPayload");

   try {
      // Check if requester is admin or removing themselves
      const requesterMember = await client.groupMember.findUnique({
         where: { userId_groupId: { userId: requesterId, groupId } },
      });

      const isAdmin = requesterMember?.role === "admin";
      const isSelf = requesterId === memberId;

      if (!isAdmin && !isSelf) {
         return c.json({ error: "Only admins can remove other members" }, 403);
      }

      // Prevent removing the last admin
      if (isAdmin && isSelf) {
         const adminCount = await client.groupMember.count({
            where: { groupId, role: "admin" },
         });
         if (adminCount <= 1) {
            return c.json(
               {
                  error: "Cannot leave: you are the only admin. Promote another member first.",
               },
               400,
            );
         }
      }

      await client.groupMember.delete({
         where: { userId_groupId: { userId: memberId, groupId } },
      });

      return c.json({ message: "Member removed successfully" }, 200);
   } catch (error) {
      console.log(error);
      return c.json({ error: "Failed to remove member" }, 500);
   }
}

// Promote/demote member (admin only)
export async function updateMemberRole(c) {
   const groupId = c.req.param("id");
   const memberId = c.req.param("memberId");
   const { role: newRole } = await c.req.json();
   const { userID: adminId } = c.get("jwtPayload");

   try {
      // Check if requester is admin
      const adminMember = await client.groupMember.findUnique({
         where: { userId_groupId: { userId: adminId, groupId } },
      });

      if (!adminMember || adminMember.role !== "admin") {
         return c.json({ error: "Only admins can change member roles" }, 403);
      }

      // Prevent demoting the last admin
      if (newRole === "member") {
         const adminCount = await client.groupMember.count({
            where: { groupId, role: "admin" },
         });
         const targetMember = await client.groupMember.findUnique({
            where: { userId_groupId: { userId: memberId, groupId } },
         });
         if (targetMember?.role === "admin" && adminCount <= 1) {
            return c.json(
               { error: "Cannot demote: this is the only admin" },
               400,
            );
         }
      }

      const updated = await client.groupMember.update({
         where: { userId_groupId: { userId: memberId, groupId } },
         data: { role: newRole },
         include: {
            user: {
               select: {
                  userID: true,
                  userName: true,
               },
            },
         },
      });

      return c.json(
         {
            message: `Member ${newRole === "admin" ? "promoted to admin" : "demoted to member"}`,
            member: updated,
         },
         200,
      );
   } catch (error) {
      console.log(error);
      return c.json({ error: "Failed to update member role" }, 500);
   }
}
