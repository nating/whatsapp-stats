# whatsapp-stats
A program for generating statistics about a whatsapp chat.

(On hold until the 12th of May)

## Overview
Whatsapp offers users the ability to export chats as text files.  
These text files' format make it easy to parse, and to gather interesting data from them.
 
## Chat Activity
In a whatsapp chat's text file, each entry represents some activity.  

Entries take the form:

```
dd/mm/yy, hh:mm:ss: <user><activity>
```

All entries begin with a date and time stamp in the format: "dd/mm/yy, hh:mm:ss:".

There are different types of chat activity:
 * Group creation
 * Group Member addition
 * Group Member leaving
 * Image (can be with or without text)
 * Audio
 * Text
 
## Terminology
To gain insight into the statistics of a chat, it is necessary to define some terms.

|Term                 |Meaning|
|---------------------|-------|
|Chat                 |A Chat of messages between two or more users.
|Member               |A participant in a chat.
|Member Group         |A set of participants in a chat.
|Message              |An image, audio file, or text sent into the chat.
|Image                |An image sent into the chat with or without text.
|Audio                |An audio file, from a voice recording or otherwise.
|Text                 |Some simple text sent into the chat.
|Conversation         |A series of messages sent into the chat without a **significant delay** between them (must be defined more clearly).
|Lit                  |A conversation is said to be *'lit'* for a given time period if its average delay between messages for that time period is less than **40 seconds** (research needed). 
|Response             |A message is 
|Conversation starter |A message is said to be a *'conversation starter'* if it is the first message sent after a **significant delay** since the last conversation.
|Seen                 |A message is said to be seen after **24hrs** (research needed) have passed since it was sent into the chat.
|Activity             |The creation of the chat, members leaving, members joining, or any type of message.
 
## Queries

Here are some examples of information about a chat that a user may be interested in:
 * Message count of a chat
 * Image count of a chat
 * Audio file count of a chat
 * Average message count per day
 * Average message count per month
 * Average message count per month
 * Message counts of members of a chat
 * Image count of members of a chat
 * Audio file count of members of a chat
 * Emoji count of members of a chat
 * Conversation count of members of a chat
 * Conversation counts of member groups
 * Time of the day chat is most active
 * Times of the week the chat is most active
 * Times of year the chat is most active
 * Chat activity before vs after a member is added
 * Chat activity before vs after a member leaves
 * What were the most lit conversations about
 * Chat activity over time
 * 
 
## To do:
 * Create comprehensive list of possible chat activity.
 * Write parsing code.
 * Create list of interesting queries.
 * Come up with an interesting way to display data.
