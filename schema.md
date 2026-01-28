# Database Schema Documentation

This document provides a detailed explanation of the Prisma schema used in the MUTSDA application.

## Overview

The database uses **PostgreSQL** as the data provider and consists of the following models:

| Model        | Database Table       | Description                                             |
| ------------ | -------------------- | ------------------------------------------------------- |
| User         | `user_table`         | Stores user account information                         |
| Event        | `event_table`        | Stores church events                                    |
| Conversation | `conversation_table` | Stores messages/conversations                           |
| Group        | `group_table`        | Stores chat groups                                      |
| GroupMember  | `GroupMember`        | Junction table for User-Group many-to-many relationship |

---

## Models

### 1. User Model

```prisma
model User {
  userID      String  @id @unique @default(uuid()) @map("id")
  email       String  @unique
  userName    String  @unique @map("username")
  password    String  @unique
  phoneNumber Int     @map("phone_number")
  role        Role    @unique
}
```

#### Fields

| Field         | Type        | Constraints      | Description                     |
| ------------- | ----------- | ---------------- | ------------------------------- |
| `userID`      | String      | PK, Unique, UUID | Primary identifier for the user |
| `email`       | String      | Unique           | User's email address            |
| `userName`    | String      | Unique           | User's display name             |
| `password`    | String      | Unique           | Hashed password                 |
| `phoneNumber` | Int         | Required         | User's phone number             |
| `role`        | Role (Enum) | Unique           | User's role in the church       |

#### Relations

- **events**: One-to-Many → A user can create multiple events
- **messages**: One-to-Many → A user can send multiple messages
- **groups**: One-to-Many (via junction) → A user can be a member of multiple groups

---

### 2. Event Model

```prisma
model Event {
  eventID        String   @id @default(uuid()) @map("event_id")
  title          String
  description    String
  category       String
  imageURL       String   @map("image_url")
  eventStartTime DateTime @map("event_start_time")
  eventEndTime   DateTime? @map("event_end_time")
  eventLocation  String?  @map("event_location")
  createdAt      DateTime @default(now()) @map("created_at")
  updatedAt      DateTime @updatedAt @map("updated_at")
  eventStartDate DateTime @map("event_start_date")
  eventEndDate   DateTime? @map("event_end_date")
  userId         String
}
```

#### Fields

| Field            | Type     | Constraints    | Description                                |
| ---------------- | -------- | -------------- | ------------------------------------------ |
| `eventID`        | String   | PK, UUID       | Primary identifier for the event           |
| `title`          | String   | Required       | Event title                                |
| `description`    | String   | Required       | Event description                          |
| `category`       | String   | Required       | Event category (e.g., worship, social)     |
| `imageURL`       | String   | Required       | URL to event image                         |
| `eventStartTime` | DateTime | Required       | Time the event starts                      |
| `eventEndTime`   | DateTime | Optional       | Time the event ends                        |
| `eventLocation`  | String   | Optional       | Location of the event                      |
| `createdAt`      | DateTime | Auto-generated | Timestamp when event was created           |
| `updatedAt`      | DateTime | Auto-updated   | Timestamp when event was last modified     |
| `eventStartDate` | DateTime | Required       | Date the event starts                      |
| `eventEndDate`   | DateTime | Optional       | Date the event ends                        |
| `userId`         | String   | FK             | Foreign key referencing the creator (User) |

#### Relations

- **user**: Many-to-One → Each event belongs to one user (the creator)

---

### 3. Conversation Model

```prisma
model Conversation {
  messageId   String        @id @default(uuid()) @map("message_id")
  messageType ConvoType     @map("message_type")
  msgStatus   MessageStatus @map("message_status")
  content     String
  userId      String
  createdAt   DateTime      @default(now()) @map("created_at")
  receiverId  String?
  groupId     String?
}
```

#### Fields

| Field         | Type                 | Constraints    | Description                                              |
| ------------- | -------------------- | -------------- | -------------------------------------------------------- |
| `messageId`   | String               | PK, UUID       | Primary identifier for the message                       |
| `messageType` | ConvoType (Enum)     | Required       | Type of conversation (community, group, direct, visitor) |
| `msgStatus`   | MessageStatus (Enum) | Required       | Status of the message (sent, delivered, read)            |
| `content`     | String               | Required       | The message content                                      |
| `userId`      | String               | FK             | Foreign key referencing the sender (User)                |
| `createdAt`   | DateTime             | Auto-generated | Timestamp when message was sent                          |
| `receiverId`  | String               | Optional       | ID of the recipient (for direct messages)                |
| `groupId`     | String               | Optional       | ID of the group (for group messages)                     |

#### Relations

- **convoUser**: Many-to-One → Each message belongs to one user (the sender)

---

### 4. Group Model

```prisma
model Group {
  groupId      String        @id @default(uuid()) @map("group_id")
  groupName    String        @map("group_name") @unique
  groupMembers GroupMember[]
  createdAt    DateTime      @default(now())
  updatedAt    DateTime      @default(now())
}
```

#### Fields

| Field       | Type     | Constraints    | Description                           |
| ----------- | -------- | -------------- | ------------------------------------- |
| `groupId`   | String   | PK, UUID       | Primary identifier for the group      |
| `groupName` | String   | Unique         | Name of the group                     |
| `createdAt` | DateTime | Auto-generated | Timestamp when group was created      |
| `updatedAt` | DateTime | Auto-generated | Timestamp when group was last updated |

#### Relations

- **groupMembers**: One-to-Many → A group can have multiple members (via GroupMember junction table)

---

### 5. GroupMember Model (Junction Table)

```prisma
model GroupMember {
  id      String    @id @default(uuid())
  userId  String
  groupId String
  role    GroupRole @default(member)  // admin, member

  @@unique([userId, groupId])
}
```

#### Fields

| Field     | Type            | Constraints    | Description                                  |
| --------- | --------------- | -------------- | -------------------------------------------- |
| `id`      | String          | PK, UUID       | Primary identifier for the membership record |
| `userId`  | String          | FK             | Foreign key referencing the User             |
| `groupId` | String          | FK             | Foreign key referencing the Group            |
| `role`    | GroupRole(Enum) | Default:member | Role within the group (admin, member)        |

#### Constraints

- **@@unique([userId, groupId])**: Ensures a user can only be a member of a specific group once

#### Relations

- **user**: Many-to-One → Each membership belongs to one user
- **group**: Many-to-One → Each membership belongs to one group

---

## Relations Diagram

```
┌─────────────────┐
│      User       │
├─────────────────┤
│ userID (PK)     │
│ email           │
│ userName        │
│ password        │
│ phoneNumber     │
│ role            │
└────────┬────────┘
         │
         │ 1:N "UserEvents"
         ▼
┌─────────────────┐
│      Event      │
├─────────────────┤
│ eventID (PK)    │
│ title           │
│ description     │
│ category        │
│ imageURL        │
│ userId (FK) ────┼──→ User.userID
│ ...             │
└─────────────────┘

┌─────────────────┐
│      User       │
└────────┬────────┘
         │
         │ 1:N "UserMessages"
         ▼
┌─────────────────┐
│  Conversation   │
├─────────────────┤
│ messageId (PK)  │
│ messageType     │
│ msgStatus       │
│ content         │
│ userId (FK) ────┼──→ User.userID
│ receiverId      │
│ groupId         │
│ createdAt       │
└─────────────────┘

┌─────────────────┐          ┌─────────────────┐          ┌─────────────────┐
│      User       │          │   GroupMember   │          │      Group      │
├─────────────────┤          ├─────────────────┤          ├─────────────────┤
│ userID (PK)     │◄────────│ userId (FK)     │          │ groupId (PK)    │
│ ...             │  1:N     │ groupId (FK)    │────────►│ groupName       │
│                 │"UserGroups"│ role          │   N:1    │                 │
└─────────────────┘          └─────────────────┘          └─────────────────┘
                                    │
                         Many-to-Many via Junction Table
```

---

## Detailed Relation Explanations

### 1. User ↔ Event (One-to-Many)

**Relation Name:** `"UserEvents"`

```
User.events → Event[] (One user can create many events)
Event.user → User (Each event has one creator)
```

**How it works:**

- The `Event` model has a `userId` field that stores the foreign key
- The `@relation("UserEvents", fields: [userId], references: [userID])` directive links `Event.userId` to `User.userID`
- From the User side, `events Event[] @relation("UserEvents")` provides access to all events created by that user

**Use Case:** When an admin creates a church event, their `userID` is stored in the event's `userId` field, establishing ownership.

---

### 2. User ↔ Conversation (One-to-Many)

**Relation Name:** `"UserMessages"`

```
User.messages → Conversation[] (One user can send many messages)
Conversation.convoUser → User (Each message has one sender)
```

**How it works:**

- The `Conversation` model has a `userId` field that stores the sender's ID
- The `@relation("UserMessages", fields: [userId], references: [userID])` directive creates the link
- From the User side, `messages Conversation[] @relation("UserMessages")` provides access to all messages sent by that user

**Use Case:** When a user sends a message in a chat, their `userID` is recorded as the sender.

---

### 3. User ↔ Group (Many-to-Many via GroupMember)

**Relation Name:** `"UserGroups"`

```
User.groups → GroupMember[] (One user can have many group memberships)
GroupMember.user → User (Each membership record belongs to one user)
GroupMember.group → Group (Each membership record belongs to one group)
Group.groupMembers → GroupMember[] (One group can have many membership records)
```

**How it works:**

- This is a **many-to-many** relationship implemented through a **junction table** (`GroupMember`)
- A user can belong to multiple groups, and a group can have multiple users
- The `GroupMember` model acts as an intermediary, storing:
   - `userId`: Links to the User
   - `groupId`: Links to the Group
   - `role`: Additional data about the membership (admin, member, moderator)
- The `@@unique([userId, groupId])` constraint prevents duplicate memberships

**Use Case:** A church member can join multiple chat groups (Youth, Choir, Elders), and each group can have multiple members with different roles.

---

## Enums

### GroupRole

Defines the role of a user within a group:

| Value    | Database Value | Description                    |
| -------- | -------------- | ------------------------------ |
| `admin`  | ADMIN          | Group administrator            |
| `member` | MEMBER         | Regular group member (default) |

### ConvoType

Defines the type of conversation:

| Value       | Database Value | Description                        |
| ----------- | -------------- | ---------------------------------- |
| `community` | COMMUNITY      | Public community-wide messages     |
| `group`     | GROUP          | Messages within a specific group   |
| `direct`    | DIRECT         | Private messages between two users |
| `visitor`   | VISITOR        | Messages from/to visitors          |

### MessageStatus

Tracks the delivery status of messages:

| Value       | Database Value | Description                             |
| ----------- | -------------- | --------------------------------------- |
| `sent`      | SENT           | Message has been sent                   |
| `delivered` | DELIVERED      | Message has been delivered to recipient |
| `read`      | READ           | Message has been read by recipient      |

### Role

Defines user roles within the church organization:

| Value            | Database Value | Description                   |
| ---------------- | -------------- | ----------------------------- |
| `user`           | USER           | Regular church member         |
| `admin1`         | ADMIN1         | Primary administrator         |
| `admin2`         | ADMIN2         | Secondary administrator       |
| `elder1`         | ELDER1         | First elder                   |
| `elder2`         | ELDER2         | Second elder                  |
| `elder3`         | ELDER3         | Third elder                   |
| `churchLeader`   | CHURCHLEADER   | Church leader                 |
| `headDeacon`     | HEADDEACON     | Head deacon                   |
| `headDeaconness` | HEADDEACONNESS | Head deaconess                |
| `sabbathSchool`  | SABBATHSCHOOL  | Sabbath school Supretendant   |
| `treasurer`      | TREASURER      | Church treasurer              |
| `clerk`          | CLERK          | Church clerk                  |
| `alo`            | ALO            | Adventist Ladies Organization |
| `amo`            | AMO            | Adventist Men Organization    |
| `prophecy`       | PROPHECY       | Prophecy ministry leader      |
| `stewardship`    | STEWARDSHIP    | Stewardship coordinator       |
| `music`          | MUSIC          | Music ministry leader         |
| `welfare`        | WELFARE        | Welfare coordinator           |
| `development`    | DEVELOPMENT    | Development coordinator       |
| `communication`  | COMMUNICATION  | Communication coordinator     |

---

## Database Mapping

The schema uses `@map` and `@@map` directives to customize database column and table names:

| Prisma Field/Model         | Database Name        |
| -------------------------- | -------------------- |
| `User`                     | `user_table`         |
| `User.userID`              | `id`                 |
| `User.userName`            | `username`           |
| `User.phoneNumber`         | `phone_number`       |
| `Event`                    | `event_table`        |
| `Event.eventID`            | `event_id`           |
| `Event.imageURL`           | `image_url`          |
| `Event.eventStartTime`     | `event_start_time`   |
| `Event.eventEndTime`       | `event_end_time`     |
| `Event.eventLocation`      | `event_location`     |
| `Event.createdAt`          | `created_at`         |
| `Event.updatedAt`          | `updated_at`         |
| `Event.eventStartDate`     | `event_start_date`   |
| `Event.eventEndDate`       | `event_end_date`     |
| `Conversation`             | `conversation_table` |
| `Conversation.messageId`   | `message_id`         |
| `Conversation.messageType` | `message_type`       |
| `Conversation.msgStatus`   | `message_status`     |
| `Conversation.createdAt`   | `created_at`         |
| `Group`                    | `group_table`        |
| `Group.groupId`            | `group_id`           |
| `Group.groupName`          | `group_name`         |
