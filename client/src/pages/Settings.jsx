import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
   faGear,
   faBell,
   faPalette,
   faChevronRight,
   faSave,
   faShieldAlt,
   faUserCog,
} from "@fortawesome/free-solid-svg-icons";

const Settings = () => {
   const [settings, setSettings] = useState({
      notifications: {
         email: true,
         push: true,
         sms: false,
         eventReminders: true,
         chatNotifications: true,
         communityUpdates: true,
      },
      privacy: {
         profileVisibility: "members",
         showOnlineStatus: true,
         allowDirectMessages: true,
      },
      appearance: {
         theme: "light",
         fontSize: "medium",
      },
      language: "en",
   });

   const [activeSection, setActiveSection] = useState("notifications");
   const [isSaving, setIsSaving] = useState(false);
   const [showSaved, setShowSaved] = useState(false);

   const toggleSetting = (category, setting) => {
      setSettings((prev) => ({
         ...prev,
         [category]: {
            ...prev[category],
            [setting]: !prev[category][setting],
         },
      }));
   };

   const updateSetting = (category, setting, value) => {
      setSettings((prev) => ({
         ...prev,
         [category]: {
            ...prev[category],
            [setting]: value,
         },
      }));
   };

   const handleSave = async () => {
      setIsSaving(true);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsSaving(false);
      setShowSaved(true);
      setTimeout(() => setShowSaved(false), 2000);
   };

   const sections = [
      { id: "notifications", name: "Notifications", icon: faBell },
      { id: "privacy", name: "Privacy", icon: faShieldAlt },
      { id: "appearance", name: "Appearance", icon: faPalette },
      { id: "account", name: "Account", icon: faUserCog },
   ];

   const ToggleSwitch = ({ enabled, onToggle }) => (
      <button
         onClick={onToggle}
         className={`relative w-14 h-7 rounded-full transition-colors duration-300 ${
            enabled ? "bg-[#3298C8]" : "bg-gray-300"
         }`}
      >
         <span
            className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full shadow transition-transform duration-300 ${
               enabled ? "translate-x-7" : "translate-x-0"
            }`}
         />
      </button>
   );

   return (
      <div className='min-h-screen bg-gray-50 py-8 px-4 animate-fadeIn'>
         <div className='max-w-5xl mx-auto'>
            {/* Header */}
            <div className='mb-8'>
               <div className='flex items-center gap-4 mb-2'>
                  <div className='w-12 h-12 bg-linear-to-br from-[#3298C8] to-sky-600 rounded-xl flex items-center justify-center'>
                     <FontAwesomeIcon
                        icon={faGear}
                        className='text-white text-xl'
                     />
                  </div>
                  <div>
                     <h1 className='text-2xl font-bold text-gray-800'>
                        Settings
                     </h1>
                     <p className='text-gray-500 text-sm'>
                        Manage your account preferences
                     </p>
                  </div>
               </div>
            </div>

            <div className='flex flex-col lg:flex-row gap-6'>
               {/* Sidebar Navigation */}
               <div className='lg:w-64 bg-white rounded-2xl shadow-lg p-4 h-fit'>
                  <nav className='space-y-1'>
                     {sections.map((section) => (
                        <button
                           key={section.id}
                           onClick={() => setActiveSection(section.id)}
                           className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                              activeSection === section.id
                                 ? "bg-[#3298C8] text-white"
                                 : "text-gray-600 hover:bg-gray-100"
                           }`}
                        >
                           <FontAwesomeIcon icon={section.icon} />
                           <span className='font-medium'>{section.name}</span>
                           <FontAwesomeIcon
                              icon={faChevronRight}
                              className={`ml-auto text-xs ${
                                 activeSection === section.id
                                    ? "text-white"
                                    : "text-gray-400"
                              }`}
                           />
                        </button>
                     ))}
                  </nav>
               </div>

               {/* Settings Content */}
               <div className='flex-1 bg-white rounded-2xl shadow-lg overflow-hidden'>
                  {/* Notifications Section */}
                  {activeSection === "notifications" && (
                     <div className='p-6 lg:p-8'>
                        <h2 className='text-xl font-bold text-gray-800 mb-6 flex items-center gap-3'>
                           <FontAwesomeIcon
                              icon={faBell}
                              className='text-[#3298C8]'
                           />
                           Notification Preferences
                        </h2>

                        <div className='space-y-6'>
                           <div className='pb-6 border-b border-gray-100'>
                              <h3 className='font-semibold text-gray-700 mb-4'>
                                 Notification Channels
                              </h3>
                              <div className='space-y-4'>
                                 <div className='flex items-center justify-between'>
                                    <div>
                                       <p className='font-medium text-gray-800'>
                                          Email Notifications
                                       </p>
                                       <p className='text-sm text-gray-500'>
                                          Receive updates via email
                                       </p>
                                    </div>
                                    <ToggleSwitch
                                       enabled={settings.notifications.email}
                                       onToggle={() =>
                                          toggleSetting(
                                             "notifications",
                                             "email",
                                          )
                                       }
                                    />
                                 </div>
                                 <div className='flex items-center justify-between'>
                                    <div>
                                       <p className='font-medium text-gray-800'>
                                          Push Notifications
                                       </p>
                                       <p className='text-sm text-gray-500'>
                                          Receive push notifications on this
                                          device
                                       </p>
                                    </div>
                                    <ToggleSwitch
                                       enabled={settings.notifications.push}
                                       onToggle={() =>
                                          toggleSetting("notifications", "push")
                                       }
                                    />
                                 </div>
                                 <div className='flex items-center justify-between'>
                                    <div>
                                       <p className='font-medium text-gray-800'>
                                          SMS Notifications
                                       </p>
                                       <p className='text-sm text-gray-500'>
                                          Receive important updates via SMS
                                       </p>
                                    </div>
                                    <ToggleSwitch
                                       enabled={settings.notifications.sms}
                                       onToggle={() =>
                                          toggleSetting("notifications", "sms")
                                       }
                                    />
                                 </div>
                              </div>
                           </div>

                           <div>
                              <h3 className='font-semibold text-gray-700 mb-4'>
                                 What to Notify
                              </h3>
                              <div className='space-y-4'>
                                 <div className='flex items-center justify-between'>
                                    <div>
                                       <p className='font-medium text-gray-800'>
                                          Event Reminders
                                       </p>
                                       <p className='text-sm text-gray-500'>
                                          Get reminded about upcoming events
                                       </p>
                                    </div>
                                    <ToggleSwitch
                                       enabled={
                                          settings.notifications.eventReminders
                                       }
                                       onToggle={() =>
                                          toggleSetting(
                                             "notifications",
                                             "eventReminders",
                                          )
                                       }
                                    />
                                 </div>
                                 <div className='flex items-center justify-between'>
                                    <div>
                                       <p className='font-medium text-gray-800'>
                                          Chat Notifications
                                       </p>
                                       <p className='text-sm text-gray-500'>
                                          Notify for new messages
                                       </p>
                                    </div>
                                    <ToggleSwitch
                                       enabled={
                                          settings.notifications
                                             .chatNotifications
                                       }
                                       onToggle={() =>
                                          toggleSetting(
                                             "notifications",
                                             "chatNotifications",
                                          )
                                       }
                                    />
                                 </div>
                                 <div className='flex items-center justify-between'>
                                    <div>
                                       <p className='font-medium text-gray-800'>
                                          Community Updates
                                       </p>
                                       <p className='text-sm text-gray-500'>
                                          Announcements and community news
                                       </p>
                                    </div>
                                    <ToggleSwitch
                                       enabled={
                                          settings.notifications
                                             .communityUpdates
                                       }
                                       onToggle={() =>
                                          toggleSetting(
                                             "notifications",
                                             "communityUpdates",
                                          )
                                       }
                                    />
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  )}

                  {/* Privacy Section */}
                  {activeSection === "privacy" && (
                     <div className='p-6 lg:p-8'>
                        <h2 className='text-xl font-bold text-gray-800 mb-6 flex items-center gap-3'>
                           <FontAwesomeIcon
                              icon={faShieldAlt}
                              className='text-[#3298C8]'
                           />
                           Privacy Settings
                        </h2>

                        <div className='space-y-6'>
                           <div>
                              <label className='block font-medium text-gray-800 mb-2'>
                                 Profile Visibility
                              </label>
                              <select
                                 value={settings.privacy.profileVisibility}
                                 onChange={(e) =>
                                    updateSetting(
                                       "privacy",
                                       "profileVisibility",
                                       e.target.value,
                                    )
                                 }
                                 className='w-full p-4 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#3298C8]/30 focus:border-[#3298C8] transition-all'
                              >
                                 <option value='everyone'>Everyone</option>
                                 <option value='members'>
                                    Church Members Only
                                 </option>
                                 <option value='none'>Only Me</option>
                              </select>
                              <p className='text-sm text-gray-500 mt-1'>
                                 Control who can see your profile information
                              </p>
                           </div>

                           <div className='flex items-center justify-between py-4 border-y border-gray-100'>
                              <div>
                                 <p className='font-medium text-gray-800'>
                                    Show Online Status
                                 </p>
                                 <p className='text-sm text-gray-500'>
                                    Let others see when you're online
                                 </p>
                              </div>
                              <ToggleSwitch
                                 enabled={settings.privacy.showOnlineStatus}
                                 onToggle={() =>
                                    toggleSetting("privacy", "showOnlineStatus")
                                 }
                              />
                           </div>

                           <div className='flex items-center justify-between'>
                              <div>
                                 <p className='font-medium text-gray-800'>
                                    Allow Direct Messages
                                 </p>
                                 <p className='text-sm text-gray-500'>
                                    Allow other members to message you
                                 </p>
                              </div>
                              <ToggleSwitch
                                 enabled={settings.privacy.allowDirectMessages}
                                 onToggle={() =>
                                    toggleSetting(
                                       "privacy",
                                       "allowDirectMessages",
                                    )
                                 }
                              />
                           </div>
                        </div>
                     </div>
                  )}

                  {/* Appearance Section */}
                  {activeSection === "appearance" && (
                     <div className='p-6 lg:p-8'>
                        <h2 className='text-xl font-bold text-gray-800 mb-6 flex items-center gap-3'>
                           <FontAwesomeIcon
                              icon={faPalette}
                              className='text-[#3298C8]'
                           />
                           Appearance
                        </h2>

                        <div className='space-y-6'>
                           <div>
                              <label className='block font-medium text-gray-800 mb-4'>
                                 Theme
                              </label>
                              <div className='grid grid-cols-3 gap-4'>
                                 {["light", "dark", "system"].map((theme) => (
                                    <button
                                       key={theme}
                                       onClick={() =>
                                          updateSetting(
                                             "appearance",
                                             "theme",
                                             theme,
                                          )
                                       }
                                       className={`p-4 rounded-xl border-2 transition-all ${
                                          settings.appearance.theme === theme
                                             ? "border-[#3298C8] bg-sky-50"
                                             : "border-gray-200 hover:border-gray-300"
                                       }`}
                                    >
                                       <div
                                          className={`w-full h-12 rounded-lg mb-2 ${
                                             theme === "light"
                                                ? "bg-white border border-gray-200"
                                                : theme === "dark"
                                                  ? "bg-gray-800"
                                                  : "bg-linear-to-r from-white to-gray-800"
                                          }`}
                                       />
                                       <p className='text-sm font-medium capitalize text-gray-700'>
                                          {theme}
                                       </p>
                                    </button>
                                 ))}
                              </div>
                           </div>

                           <div>
                              <label className='block font-medium text-gray-800 mb-4'>
                                 Font Size
                              </label>
                              <div className='flex gap-4'>
                                 {["small", "medium", "large"].map((size) => (
                                    <button
                                       key={size}
                                       onClick={() =>
                                          updateSetting(
                                             "appearance",
                                             "fontSize",
                                             size,
                                          )
                                       }
                                       className={`flex-1 p-4 rounded-xl border-2 transition-all ${
                                          settings.appearance.fontSize === size
                                             ? "border-[#3298C8] bg-sky-50"
                                             : "border-gray-200 hover:border-gray-300"
                                       }`}
                                    >
                                       <p
                                          className={`font-medium capitalize text-gray-700 ${
                                             size === "small"
                                                ? "text-sm"
                                                : size === "large"
                                                  ? "text-lg"
                                                  : ""
                                          }`}
                                       >
                                          {size}
                                       </p>
                                    </button>
                                 ))}
                              </div>
                           </div>
                        </div>
                     </div>
                  )}

                  {/* Account Section */}
                  {activeSection === "account" && (
                     <div className='p-6 lg:p-8'>
                        <h2 className='text-xl font-bold text-gray-800 mb-6 flex items-center gap-3'>
                           <FontAwesomeIcon
                              icon={faUserCog}
                              className='text-[#3298C8]'
                           />
                           Account Settings
                        </h2>

                        <div className='space-y-6'>
                           <div>
                              <label className='block font-medium text-gray-800 mb-2'>
                                 Language
                              </label>
                              <select
                                 value={settings.language}
                                 onChange={(e) =>
                                    setSettings((prev) => ({
                                       ...prev,
                                       language: e.target.value,
                                    }))
                                 }
                                 className='w-full p-4 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#3298C8]/30 focus:border-[#3298C8] transition-all'
                              >
                                 <option value='en'>English</option>
                                 <option value='sw'>Swahili</option>
                                 <option value='fr'>French</option>
                              </select>
                           </div>

                           <div className='pt-6 border-t border-gray-100'>
                              <h3 className='font-semibold text-gray-700 mb-4'>
                                 Danger Zone
                              </h3>
                              <div className='space-y-3'>
                                 <button className='w-full p-4 border border-red-200 rounded-xl text-red-600 hover:bg-red-50 transition-colors text-left'>
                                    <span className='font-medium'>
                                       Deactivate Account
                                    </span>
                                 </button>
                              </div>
                           </div>
                        </div>
                     </div>
                  )}

                  {/* Save Button */}
                  <div className='px-6 lg:px-8 py-6 bg-gray-50 border-t border-gray-200 flex justify-end'>
                     <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className='px-8 py-3 bg-gradient-to-r from-[#3298C8] to-sky-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-sky-300/30 transition-all disabled:opacity-70 flex items-center gap-2'
                     >
                        {isSaving ? (
                           <>
                              <span className='w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin'></span>
                              Saving...
                           </>
                        ) : showSaved ? (
                           <>
                              <FontAwesomeIcon icon={faSave} />
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
            </div>
         </div>
      </div>
   );
};

export default Settings;
