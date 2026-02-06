// Calendar of Events data
const calendarEvents = [
   {
      date: "Jan 10",
      event: "Thanksgiving Sabbath",
      description:
         "A special Sabbath dedicated to gratitude and acknowledging God's blessings",
      color: "bg-[#3298C8]/10 text-[#3298C8]",
   },
   {
      date: "Jan 17",
      event: "Holy Communion Sabbath",
      description:
         "A sacred service focusing on the Lord's Supper and spiritual renewal",
      color: "bg-purple-100 text-purple-700",
   },
   {
      date: "Jan 18",
      event: "Joint Board Meeting",
      description:
         "Combined meeting of church leadership to review plans and ministries",
      color: "bg-gray-100 text-gray-700",
   },
   {
      date: "Jan 21-30",
      event: "The 10 Days of Prayer",
      description: "A period of intensive prayer and spiritual revival",
      color: "bg-amber-100 text-amber-700",
   },
   {
      date: "Jan 24",
      event: "SOP and VOP Sabbath",
      description:
         "Highlighting Spirit of Prophecy and Voice of Prophecy ministries",
      color: "bg-green-100 text-green-700",
   },
   {
      date: "Jan 25-31",
      event: "Week of Spiritual Emphasis",
      description: "Week-long spiritual revival with sermons and devotionals",
      color: "bg-rose-100 text-rose-700",
   },
   {
      date: "Jan 31",
      event: "Prayer and Leadership Sabbath",
      description: "Dedicated to prayer and empowerment of church leaders",
      color: "bg-indigo-100 text-indigo-700",
   },
   {
      date: "Feb 1",
      event: "Church Board Meeting",
      description: "Regular leadership meeting for church administration",
      color: "bg-gray-100 text-gray-700",
   },
   {
      date: "Feb 7",
      event: "Internal Music Sabbath",
      description:
         "Worship service led by internal church choirs and music groups",
      color: "bg-cyan-100 text-cyan-700",
   },
   {
      date: "Feb 8",
      event: "AMM and ALO Sunday",
      description:
         "Adventist Men's Ministry and Adventist Ladies Organization activities",
      color: "bg-pink-100 text-pink-700",
   },
   {
      date: "Feb 14",
      event: "Mini-Harambee & Communication Sabbath",
      description: "Fundraising and communication-focused Sabbath",
      color: "bg-orange-100 text-orange-700",
   },
   {
      date: "Feb 21",
      event: "Finalist Sabbath",
      description: "Recognizing and praying for completing students",
      color: "bg-teal-100 text-teal-700",
   },
   {
      date: "Feb 22",
      event: "Hike",
      description: "Outdoor fellowship promoting health and bonding",
      color: "bg-lime-100 text-lime-700",
   },
   {
      date: "Feb 28",
      event: "Family Life & Appreciation Sabbath",
      description:
         "Emphasizing family values and appreciation of church workers",
      color: "bg-violet-100 text-violet-700",
   },
   {
      date: "Mar 1",
      event: "Church Board Meeting",
      description: "Leadership meeting for planning and coordination",
      color: "bg-gray-100 text-gray-700",
   },
   {
      date: "Mar 7",
      event: "External Music Sabbath / Music Night",
      description: "Worship event with guest musicians for evangelism",
      color: "bg-[#3298C8]/10 text-[#3298C8]",
   },
   {
      date: "Mar 14",
      event: "Mega Harambee & Associate Sabbath",
      description: "Major fundraising Sabbath with associate members",
      color: "bg-amber-100 text-amber-700",
   },
   {
      date: "Mar 21",
      event: "GYD and GCD Sabbath",
      description:
         "Global Youth Day and Global Children's Day service and outreach",
      color: "bg-green-100 text-green-700",
   },
   {
      date: "Mar 22-28",
      event: "Youth Week of Prayer",
      description: "Week dedicated to youth spiritual growth and leadership",
      color: "bg-rose-100 text-rose-700",
   },
   {
      date: "Mar 28",
      event: "Marching Out Sabbath",
      description: "Ceremonial Sabbath for outgoing leaders commissioning",
      color: "bg-indigo-100 text-indigo-700",
   },
   {
      date: "Apr 4",
      event: "Holy Communion Sabbath",
      description: "Communion service emphasizing humility and reconciliation",
      color: "bg-purple-100 text-purple-700",
   },
   {
      date: "Apr 11",
      event: "Sabbath School Sabbath",
      description: "Celebrating Sabbath School ministries and Bible study",
      color: "bg-cyan-100 text-cyan-700",
   },
];
export default calendarEvents;
