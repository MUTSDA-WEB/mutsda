import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import zxcvbn from "zxcvbn";
import userStore from "../../hooks/useStore";
import { useUpdatePassword, useUpdateProfile } from "../../services/user";
import { uploadAvatar } from "../../services/upload";
import { queryClient } from "../../main";
import {
   faEdit,
   faEnvelope,
   faExclamationCircle,
   faEye,
   faEyeSlash,
   faIdCard,
   faLock,
   faPhone,
   faShieldAlt,
   faUser,
   faTimes,
   faSave,
   faCheckCircle,
   faCamera,
   faSpinner,
} from "@fortawesome/free-solid-svg-icons";

const Profile = () => {
   const { user, setUser } = userStore();
   const { userName, email, phoneNumber, role, userID, imageURL } = user || {};
   const [isEditing, setIsEditing] = useState(false);
   const [editForm, setEditForm] = useState({
      userName: "",
      email: "",
      phoneNumber: "",
   });
   const {
      mutate: updateProfile,
      isPending: updatingProfile,
      isSuccess,
   } = useUpdateProfile();
   const { mutate: updatePassword, isPending: updatingPassword } =
      useUpdatePassword();
   const [editErrors, setEditErrors] = useState({});
   const [profileSaveSuccess, setProfileSaveSuccess] = useState(false);

   // Update editForm when user data is ready
   useEffect(() => {
      if (user) {
         setEditForm({
            userName: userName || "",
            email: email || "",
            phoneNumber: phoneNumber || "",
         });
      }
   }, [user, userName, email, phoneNumber]);

   // Password change state
   const [showPasswordForm, setShowPasswordForm] = useState(false);
   const [passwordForm, setPasswordForm] = useState({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
   });
   const [showPasswords, setShowPasswords] = useState({
      current: false,
      new: false,
      confirm: false,
   });
   const [passwordErrors, setPasswordErrors] = useState({});
   const [passwordSaveSuccess, setPasswordSaveSuccess] = useState(false);

   // Avatar upload state
   const fileInputRef = useRef(null);
   const [uploadingAvatar, setUploadingAvatar] = useState(false);
   const [avatarError, setAvatarError] = useState("");

   // Handle avatar upload
   const handleAvatarClick = () => {
      fileInputRef.current?.click();
   };

   const handleAvatarChange = async (e) => {
      const file = e.target.files?.[0];
      if (!file) return;

      // Validate file type
      if (!file.type.startsWith("image/")) {
         setAvatarError("Please select an image file");
         return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
         setAvatarError("Image must be less than 5MB");
         return;
      }

      setAvatarError("");
      setUploadingAvatar(true);

      try {
         // Upload to Cloudinary
         const imageInfo = await uploadAvatar(file);
         
         // Update profile with new avatar URL
         updateProfile(
            { imageURL: imageInfo.optimzedUrl },
            {
               onSuccess: () => {
                  setUser({
                     ...user,
                     imageURL: imageInfo.optimzedUrl,
                  });
                  queryClient.invalidateQueries({ queryKey: ["CHECK_LOGIN"] });
                  setUploadingAvatar(false);
               },
               onError: (err) => {
                  setAvatarError("Failed to update profile picture");
                  setUploadingAvatar(false);
                  console.error("Avatar update error:", err);
               },
            }
         );
      } catch (err) {
         setAvatarError("Failed to upload image");
         setUploadingAvatar(false);
         console.error("Avatar upload error:", err);
      }

      // Reset file input
      e.target.value = "";
   };

   // Handle profile edit
   const handleEditChange = (e) => {
      const { name, value } = e.target;
      setEditForm((prev) => ({ ...prev, [name]: value }));
      if (editErrors[name]) {
         setEditErrors((prev) => ({ ...prev, [name]: "" }));
      }
   };

   const validateEditForm = () => {
      const errors = {};
      if (!editForm.userName.trim()) {
         errors.userName = "Username is required";
      } else if (editForm.userName.length < 3) {
         errors.userName = "Username must be at least 3 characters";
      }
      if (!editForm.email.trim()) {
         errors.email = "Email is required";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(editForm.email)) {
         errors.email = "Please enter a valid email";
      }
      if (!editForm.phoneNumber.toString().trim()) {
         errors.phoneNumber = "Phone number is required";
      }
      return errors;
   };

   const handleSaveProfile = async () => {
      const errors = validateEditForm();
      if (Object.keys(errors).length > 0) {
         setEditErrors(errors);
         return;
      }
      const { userName, email, phoneNumber } = editForm;
      updateProfile(
         { userName, email, phoneNumber },
         {
            onSuccess: () => {
               setProfileSaveSuccess(true);
               // Update local state immediately with new data
               setUser({
                  ...user,
                  userName: editForm.userName,
                  email: editForm.email,
                  phoneNumber: editForm.phoneNumber,
               });
               // Also refetch from server to ensure consistency
               queryClient.invalidateQueries({
                  queryKey: ["CHECK_LOGIN"],
               });
               setIsEditing(false);
               console.log("Profile update successful");
            },
            onError: (e) => {
               console.log("Failed to update profile. Error", e.message);
            },
         },
      );
   };

   const cancelEdit = () => {
      setEditForm({
         username: userName,
         email: email,
         phoneNumber: phoneNumber,
      });
      setEditErrors({});
      setIsEditing(false);
   };

   // Handle password change
   const handlePasswordChange = (e) => {
      const { name, value } = e.target;
      setPasswordForm((prev) => ({ ...prev, [name]: value }));
      if (passwordErrors[name]) {
         setPasswordErrors((prev) => ({ ...prev, [name]: "" }));
      }
   };

   const validatePasswordForm = () => {
      const errors = {};
      if (!passwordForm.currentPassword) {
         errors.currentPassword = "Current password is required";
      }
      if (!passwordForm.newPassword) {
         errors.newPassword = "New password is required";
      } else if (passwordForm.newPassword.length < 8) {
         errors.newPassword = "Password must be at least 8 characters";
      } else if (zxcvbn(passwordForm.newPassword).score < 3)
         errors.newPassword = "Password is weak choose a stronger one!!";
      else if (!/(?=.*[0-9])(?=.*[a-zA-Z])/.test(passwordForm.newPassword)) {
         errors.newPassword = "Password must contain letters and numbers";
      }
      if (!passwordForm.confirmPassword) {
         errors.confirmPassword = "Please confirm your password";
      } else if (passwordForm.newPassword !== passwordForm.confirmPassword) {
         errors.confirmPassword = "Passwords do not match";
      }
      return errors;
   };

   const handleSavePassword = async () => {
      const errors = validatePasswordForm();
      if (Object.keys(errors).length > 0) {
         setPasswordErrors(errors);
         return;
      }

      updatePassword(
         {
            oldPassword: passwordForm.currentPassword,
            newPassword: passwordForm.newPassword,
         },
         {
            onSuccess: () => {
               setPasswordSaveSuccess(true);
               setShowPasswordForm(false);
               setPasswordForm({
                  currentPassword: "",
                  newPassword: "",
                  confirmPassword: "",
               });
               console.log("Password update successful");
            },

            onError: (e) => {
               console.log("Failed to update password", "Error: ", e.message);
            },
         },
      );
   };

   const cancelPasswordChange = () => {
      setPasswordForm({
         currentPassword: "",
         newPassword: "",
         confirmPassword: "",
      });
      setPasswordErrors({});
      setShowPasswordForm(false);
   };

   const togglePasswordVisibility = (field) => {
      setShowPasswords((prev) => ({ ...prev, [field]: !prev[field] }));
   };

   // eslint-disable-next-line react/prop-types
   const InfoItem = ({ icon, label, value, isHighlighted = false }) => (
      <div className='flex items-start gap-4 p-4 bg-gray-50 rounded-xl'>
         <div
            className={`w-10 h-10 rounded-lg flex items-center justify-center ${isHighlighted ? "bg-[#3298C8]/10" : "bg-gray-200"}`}
         >
            <FontAwesomeIcon
               icon={icon}
               className={isHighlighted ? "text-[#3298C8]" : "text-gray-500"}
            />
         </div>
         <div>
            <p className='text-xs text-gray-500 uppercase tracking-wider'>
               {label}
            </p>
            <p
               className={`font-semibold ${isHighlighted ? "text-[#3298C8]" : "text-gray-800"}`}
            >
               {value}
            </p>
         </div>
      </div>
   );

   return (
      <div className='min-h-screen bg-gray-50 py-8 px-4'>
         <div className='max-w-4xl mx-auto'>
            {/* Header with Avatar */}
            <div className='mb-8'>
               <div className='flex items-center gap-4 mb-2'>
                  {/* Avatar with upload */}
                  <div className='relative'>
                     <div 
                        onClick={handleAvatarClick}
                        className='w-20 h-20 rounded-2xl overflow-hidden shadow-lg shadow-sky-200 cursor-pointer group relative'
                     >
                        {imageURL && !imageURL.endsWith('.png') ? (
                           <img
                              src={imageURL}
                              alt={userName}
                              className='w-full h-full object-cover'
                           />
                        ) : (
                           <div className='w-full h-full bg-linear-to-br from-[#3298C8] to-sky-600 flex items-center justify-center'>
                              <span className='text-white text-2xl font-bold'>
                                 {userName?.substring(0, 2).toUpperCase() || 'U'}
                              </span>
                           </div>
                        )}
                        {/* Hover overlay */}
                        <div className='absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center'>
                           {uploadingAvatar ? (
                              <FontAwesomeIcon icon={faSpinner} className='text-white text-xl animate-spin' />
                           ) : (
                              <FontAwesomeIcon icon={faCamera} className='text-white text-xl' />
                           )}
                        </div>
                     </div>
                     {/* Hidden file input */}
                     <input
                        ref={fileInputRef}
                        type='file'
                        accept='image/*'
                        onChange={handleAvatarChange}
                        className='hidden'
                     />
                  </div>
                  <div>
                     <h1 className='text-2xl font-bold text-gray-800'>
                        My Profile
                     </h1>
                     <p className='text-gray-500'>
                        View and manage your account information
                     </p>
                     {avatarError && (
                        <p className='text-red-500 text-sm mt-1'>{avatarError}</p>
                     )}
                  </div>
               </div>
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
               {/* User Information Card */}
               <div className='bg-white rounded-2xl shadow-lg overflow-hidden'>
                  <div className='p-6 bg-linear-to-r from-[#3298C8] to-sky-600'>
                     <div className='flex items-center justify-between'>
                        <h2 className='text-lg font-bold text-white flex items-center gap-2'>
                           <FontAwesomeIcon icon={faIdCard} />
                           Account Information
                        </h2>
                        {!isEditing && (
                           <button
                              onClick={() => setIsEditing(true)}
                              className='px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2'
                           >
                              <FontAwesomeIcon icon={faEdit} />
                              Edit
                           </button>
                        )}
                     </div>
                  </div>

                  <div className='p-6'>
                     {!isEditing ? (
                        <div className='space-y-4'>
                           <InfoItem
                              icon={faUser}
                              label='Username'
                              value={userName}
                           />
                           <InfoItem
                              icon={faEnvelope}
                              label='Email Address'
                              value={email}
                           />
                           <InfoItem
                              icon={faPhone}
                              label='Phone Number'
                              value={phoneNumber}
                           />
                           <InfoItem
                              icon={faShieldAlt}
                              label='Leadership Role'
                              value={role}
                              isHighlighted
                           />
                           <div className='grid grid-cols-2 gap-4'>
                              <div className='p-4 bg-gray-50 rounded-xl'>
                                 <p className='text-xs text-gray-500 uppercase tracking-wider'>
                                    Member Since
                                 </p>
                                 <p className='font-semibold text-gray-800'>
                                    {user?.memberSince}
                                 </p>
                              </div>
                              <div className='p-4 bg-gray-50 rounded-xl'>
                                 <p className='text-xs text-gray-500 uppercase tracking-wider'>
                                    Department
                                 </p>
                                 <p className='font-semibold text-gray-800'>
                                    {user?.department}
                                 </p>
                              </div>
                           </div>
                        </div>
                     ) : (
                        <div className='space-y-4'>
                           {/* Non-editable fields */}
                           <div className='p-4 bg-gray-100 rounded-xl opacity-75'>
                              <p className='text-xs text-gray-500 uppercase tracking-wider mb-1'>
                                 User ID (Cannot be changed)
                              </p>
                              <p className='font-semibold text-gray-600'>
                                 {userID}
                              </p>
                           </div>
                           <div className='p-4 bg-gray-100 rounded-xl opacity-75'>
                              <p className='text-xs text-gray-500 uppercase tracking-wider mb-1'>
                                 Leadership Role (Contact admin to change)
                              </p>
                              <p className='font-semibold text-gray-600'>
                                 {role}
                              </p>
                           </div>

                           {/* Editable fields */}
                           <div>
                              <label className='block text-sm font-medium text-gray-700 mb-2'>
                                 Username
                              </label>
                              <input
                                 type='text'
                                 name='userName'
                                 value={editForm.userName}
                                 onChange={handleEditChange}
                                 className={`w-full p-4 border rounded-xl outline-none transition-all ${
                                    editErrors.userName
                                       ? "border-red-300 focus:ring-red-200 focus:border-red-400"
                                       : "border-gray-200 focus:ring-[#3298C8]/20 focus:border-[#3298C8]"
                                 } focus:ring-2`}
                              />
                              {editErrors.userName && (
                                 <p className='mt-1 text-sm text-red-500 flex items-center gap-1'>
                                    <FontAwesomeIcon
                                       icon={faExclamationCircle}
                                    />
                                    {editErrors.username}
                                 </p>
                              )}
                           </div>

                           <div>
                              <label className='block text-sm font-medium text-gray-700 mb-2'>
                                 Email Address
                              </label>
                              <input
                                 type='email'
                                 name='email'
                                 value={editForm.email}
                                 onChange={handleEditChange}
                                 className={`w-full p-4 border rounded-xl outline-none transition-all ${
                                    editErrors.email
                                       ? "border-red-300 focus:ring-red-200 focus:border-red-400"
                                       : "border-gray-200 focus:ring-[#3298C8]/20 focus:border-[#3298C8]"
                                 } focus:ring-2`}
                              />
                              {editErrors.email && (
                                 <p className='mt-1 text-sm text-red-500 flex items-center gap-1'>
                                    <FontAwesomeIcon
                                       icon={faExclamationCircle}
                                    />
                                    {editErrors.email}
                                 </p>
                              )}
                           </div>

                           <div>
                              <label className='block text-sm font-medium text-gray-700 mb-2'>
                                 Phone Number
                              </label>
                              <input
                                 type='tel'
                                 name='phoneNumber'
                                 value={editForm.phoneNumber}
                                 onChange={handleEditChange}
                                 className={`w-full p-4 border rounded-xl outline-none transition-all ${
                                    editErrors.phoneNumber
                                       ? "border-red-300 focus:ring-red-200 focus:border-red-400"
                                       : "border-gray-200 focus:ring-[#3298C8]/20 focus:border-[#3298C8]"
                                 } focus:ring-2`}
                              />
                              {editErrors.phoneNumber && (
                                 <p className='mt-1 text-sm text-red-500 flex items-center gap-1'>
                                    <FontAwesomeIcon
                                       icon={faExclamationCircle}
                                    />
                                    {editErrors.phoneNumber}
                                 </p>
                              )}
                           </div>

                           {/* Action Buttons */}
                           <div className='flex gap-3 pt-4'>
                              <button
                                 onClick={cancelEdit}
                                 className='flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2'
                              >
                                 <FontAwesomeIcon icon={faTimes} />
                                 Cancel
                              </button>
                              <button
                                 onClick={handleSaveProfile}
                                 disabled={updatingProfile}
                                 className='flex-1 px-4 py-3 bg-linear-to-r from-[#3298C8] to-sky-600 text-white rounded-xl font-medium hover:shadow-lg transition-all disabled:opacity-70 flex items-center justify-center gap-2'
                              >
                                 {updatingProfile ? (
                                    <>
                                       <span className='w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin'></span>
                                       Saving...
                                    </>
                                 ) : profileSaveSuccess ? (
                                    <>
                                       <FontAwesomeIcon icon={faCheckCircle} />
                                       Saved!
                                    </>
                                 ) : (
                                    <>
                                       <FontAwesomeIcon icon={faSave} />
                                       Save Changes
                                    </>
                                 )}
                              </button>
                           </div>
                        </div>
                     )}
                  </div>
               </div>

               {/* Password Change Card */}
               <div className='bg-white rounded-2xl shadow-lg overflow-hidden h-fit'>
                  <div className='p-6 bg-linear-to-r from-gray-800 to-gray-700'>
                     <h2 className='text-lg font-bold text-white flex items-center gap-2'>
                        <FontAwesomeIcon icon={faLock} />
                        Security
                     </h2>
                  </div>

                  <div className='p-6'>
                     {!showPasswordForm ? (
                        <div className='text-center py-8'>
                           <div className='w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4'>
                              <FontAwesomeIcon
                                 icon={faLock}
                                 className='text-gray-400 text-2xl'
                              />
                           </div>
                           <h3 className='font-semibold text-gray-800 mb-2'>
                              Password Protected
                           </h3>
                           <p className='text-gray-500 text-sm mb-6'>
                              Keep your account secure by using a strong
                              password
                           </p>
                           <button
                              onClick={() => setShowPasswordForm(true)}
                              className='px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-xl font-medium transition-colors'
                           >
                              Change Password
                           </button>
                        </div>
                     ) : (
                        <div className='space-y-4'>
                           <div>
                              <label className='block text-sm font-medium text-gray-700 mb-2'>
                                 Current Password
                              </label>
                              <div className='relative'>
                                 <input
                                    type={
                                       showPasswords.current
                                          ? "text"
                                          : "password"
                                    }
                                    name='currentPassword'
                                    value={passwordForm.currentPassword}
                                    onChange={handlePasswordChange}
                                    className={`w-full p-4 pr-12 border rounded-xl outline-none transition-all ${
                                       passwordErrors.currentPassword
                                          ? "border-red-300 focus:ring-red-200 focus:border-red-400"
                                          : "border-gray-200 focus:ring-[#3298C8]/20 focus:border-[#3298C8]"
                                    } focus:ring-2`}
                                    placeholder='Enter current password'
                                 />
                                 <button
                                    type='button'
                                    onClick={() =>
                                       togglePasswordVisibility("current")
                                    }
                                    className='absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600'
                                 >
                                    <FontAwesomeIcon
                                       icon={
                                          showPasswords.current
                                             ? faEyeSlash
                                             : faEye
                                       }
                                    />
                                 </button>
                              </div>
                              {passwordErrors.currentPassword && (
                                 <p className='mt-1 text-sm text-red-500 flex items-center gap-1'>
                                    <FontAwesomeIcon
                                       icon={faExclamationCircle}
                                    />
                                    {passwordErrors.currentPassword}
                                 </p>
                              )}
                           </div>

                           <div>
                              <label className='block text-sm font-medium text-gray-700 mb-2'>
                                 New Password
                              </label>
                              <div className='relative'>
                                 <input
                                    type={
                                       showPasswords.new ? "text" : "password"
                                    }
                                    name='newPassword'
                                    value={passwordForm.newPassword}
                                    onChange={handlePasswordChange}
                                    className={`w-full p-4 pr-12 border rounded-xl outline-none transition-all ${
                                       passwordErrors.newPassword
                                          ? "border-red-300 focus:ring-red-200 focus:border-red-400"
                                          : "border-gray-200 focus:ring-[#3298C8]/20 focus:border-[#3298C8]"
                                    } focus:ring-2`}
                                    placeholder='Enter new password'
                                 />
                                 <button
                                    type='button'
                                    onClick={() =>
                                       togglePasswordVisibility("new")
                                    }
                                    className='absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600'
                                 >
                                    <FontAwesomeIcon
                                       icon={
                                          showPasswords.new ? faEyeSlash : faEye
                                       }
                                    />
                                 </button>
                              </div>
                              {passwordErrors.newPassword && (
                                 <p className='mt-1 text-sm text-red-500 flex items-center gap-1'>
                                    <FontAwesomeIcon
                                       icon={faExclamationCircle}
                                    />
                                    {passwordErrors.newPassword}
                                 </p>
                              )}
                              <p className='mt-1 text-xs text-gray-500'>
                                 Must be at least 8 characters with letters and
                                 numbers
                              </p>
                           </div>

                           <div>
                              <label className='block text-sm font-medium text-gray-700 mb-2'>
                                 Confirm New Password
                              </label>
                              <div className='relative'>
                                 <input
                                    type={
                                       showPasswords.confirm
                                          ? "text"
                                          : "password"
                                    }
                                    name='confirmPassword'
                                    value={passwordForm.confirmPassword}
                                    onChange={handlePasswordChange}
                                    className={`w-full p-4 pr-12 border rounded-xl outline-none transition-all ${
                                       passwordErrors.confirmPassword
                                          ? "border-red-300 focus:ring-red-200 focus:border-red-400"
                                          : "border-gray-200 focus:ring-[#3298C8]/20 focus:border-[#3298C8]"
                                    } focus:ring-2`}
                                    placeholder='Confirm new password'
                                 />
                                 <button
                                    type='button'
                                    onClick={() =>
                                       togglePasswordVisibility("confirm")
                                    }
                                    className='absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600'
                                 >
                                    <FontAwesomeIcon
                                       icon={
                                          showPasswords.confirm
                                             ? faEyeSlash
                                             : faEye
                                       }
                                    />
                                 </button>
                              </div>
                              {passwordErrors.confirmPassword && (
                                 <p className='mt-1 text-sm text-red-500 flex items-center gap-1'>
                                    <FontAwesomeIcon
                                       icon={faExclamationCircle}
                                    />
                                    {passwordErrors.confirmPassword}
                                 </p>
                              )}
                           </div>

                           {/* Action Buttons */}
                           <div className='flex gap-3 pt-4'>
                              <button
                                 onClick={cancelPasswordChange}
                                 className='flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2'
                              >
                                 <FontAwesomeIcon icon={faTimes} />
                                 Cancel
                              </button>
                              <button
                                 onClick={handleSavePassword}
                                 disabled={updatingPassword}
                                 className='flex-1 px-4 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-xl font-medium transition-all disabled:opacity-70 flex items-center justify-center gap-2'
                              >
                                 {updatingPassword ? (
                                    <>
                                       <span className='w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin'></span>
                                       Updating...
                                    </>
                                 ) : passwordSaveSuccess ? (
                                    <>
                                       <FontAwesomeIcon icon={faCheckCircle} />
                                       Updated!
                                    </>
                                 ) : (
                                    <>
                                       <FontAwesomeIcon icon={faLock} />
                                       Update Password
                                    </>
                                 )}
                              </button>
                           </div>
                        </div>
                     )}
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Profile;
