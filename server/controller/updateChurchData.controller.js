// for the bibleStudy by the SOP leader

/* expected data format 
{
    Topic: "Overall Bible study topic"
    schedule:
    [
      {  subtopic: "the day discussion topic"
        group: "e.g Soldiers of Christ"
        day: "day of meeting e.g wednesday"
        time: "6.00pm"
        },
      {  subtopic: "the day discussion topic"
        group: "e.g Soldiers of Christ"
        day: "day of meeting e.g wednesday"
        time: "6.00pm",
        coordinator: "Name - phoneNumber"
        },
    ],
    Resources: ["book1", "desire of ages"]  // list of books that people can further read for deeper study 
}   
*/

// for music Director
/* {
    churchChoir: {
        memberCount: {
            sop: 12,
            alto: 6,
            tennor: 8,
            bass: 10
        },
        trainingTime: ["Wednesday at 6.00pm", "Sunday at 9.00am"]
        description: "something about church choir ",
        trainer: "Name of the trainer"
    }, 
    "Group 1 name" : {
         memberCount: {
            sop: 12,
            alto: 6,
            tennor: 8,
            bass: 10
        },
        trainingTime: ["Wednesday at 6.00pm", "Sunday at 9.00am"]
        description: "something about church choir ",
        trainer: "Name of the trainer"
    }
    // and so on 
 }
*/

// Communication and publishing leader
// maintaining the library record

/**
 * {
 *  hardCopies: {
 *     {name: "bookName", count: 30, category: "Spiritual, Music, historical"},
 *      // and so on  
 *  }, 
 *  softCopies :[
 *      {
 *      name: "bookName", 
 *      downloadLink: "url",
        category: "bible" 
*      }
        // and so on 
 *  ]
 * }
 */

// sabbath school
/*
    {
       lesson:{lessonMainTitle: "The great Controversy",
            week: 3,
            weekTitle: "The light shines in the Darkness",
            DownloadLink: "url",
            memoryVerse: "Psalms 119:105, thy word is lamp unto my feet",
            weekLessonSummary: " this week we explore about ..."
        },
        program: {
            serviceName: {
                timeStart: 8.00am,
                duration: "30 minutes",
                leader: "leader's name"
            }
            // and so on 
        }
    }
*/

// merchandise - to be updated by welfare leader
// {
//     products: [
//         {
//             name: "productName",
//             description: "About product",
//             price: 1200,
//             productImage: "url"
//         }
//         // and so on
//     ]
// }

// Calendar of events - to be updated by the PM
/*
    {
       event: [
         {
            date: "Jan 10",
            event: "Thanksgiving Sabbath",
            description:
         "A special Sabbath dedicated to gratitude and acknowledging God's blessings",
         }, 
            // and so on 
        ]
    }
*/
