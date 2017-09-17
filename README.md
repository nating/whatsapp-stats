**WhatsApp does not endorse or sponsor this project.**

# WhatsApp Stats

<img src="/assets/whatsapp-stats-logo.png" width="150px"></img>

A web app for visualising data from a WhatsApp chat.

The current version can be used [here](https://nating.github.io/whatsapp-stats) for chats exported from iOS.

## Overview
WhatsApp offers users the ability to export chats as text files.  
These text files' format make it easy to parse, and to gather interesting data from them.
 
## Terminology
To gain insight into the statistics of a chat, it is necessary to define some terms.

|Term                 |Meaning|
|---------------------|-------|
|Chat                 |A chat of messages between two or more users.
|Member               |A participant in a chat.
|Member Group         |A set of participants in a chat.
|Message              |An image, audio file, or text sent into a chat.
|Image                |An image sent into a chat with or without text.
|Audio                |An audio file, from a voice recording or otherwise, sent into a chat.
|Video                |An video sent into a chat with or without text.
|Location             |A location, sent into a chat.
|Document             |A document sent into a chat with or without text.
|Text                 |Some simple text sent into a chat.
|Conversation         |A series of messages sent into a chat without a **significant delay** between them (must be defined more clearly).
|Lit                  |A conversation is said to be *'lit'* for a given time period if its average delay between messages for that time period is less than **40 seconds** (research needed). 
|Response             |**Definition Needed** (A message that is being sent because another message had been sent in before. Difficult to define with time because a user might not respond for days.)
|Conversation starter |A message is said to be a *'conversation starter'* if it is the first message sent after a **significant delay** since the last conversation in the chat.
|Conversation finisher|A message is said to be a *'conversation finisher'* if it is the last message of a conversation.
|Seen                 |A message is said to be seen after **24hrs** (research needed) have passed since it was sent into the chat.
|Activity             |The creation of a chat, members leaving a chat, members joining a chat, or any type of message into a chat.
 
## Queries

Queries about the data in the whatsapp chat are the heart of the project. Implementing each query to find figures is easy. The difficult/time consuming part is to integrated the query into the app by representing the data in an easy-to-read nice way.

Here are some examples of information about a chat that a user may be interested in:

**Integrated**
 * Message counts of members of a chat
 * Image count of members of a chat
 * Audio file count of members of a chat

**Implemented**
 * Message count of a chat
 * Image count of a chat
 * Audio file count of a chat
 * Video count of a chat
 
**Ideas**
 * Average message count per day/month/year
 * Emoji count of members of a chat
 * Conversation starters/finishers count of members of a chat
 * Conversation count of members of a chat
 * Conversation counts of member groups
 * Time of the day/week/year chat is most active
 * Time of the day/week/year a member is most active
 * Chat activity before vs after a member is added/leaves
 * What were the most lit conversations about
 * Chat activity over time
 * Member activity over time
 * Member who gets the most/least responses
 * Average number of responses to a conversation starter of members of a chat
 
## Parsing chat activity
A WhatsApp chat's text file is made up of lines of activity. Each activity is represented by its own line and takes the form:
```
dd/mm/yy, hh:mm:ss: <activity>
```

Activities can take different forms:

We can see that *Messages* always begin with `<user>`, while other types of activity may not.

Activity              |Form in chat exported without media
----------------------|---
|Member addition      |`<user>' was added'` or `<user>' added you'` or `You were added`
|Member removal       |`<user>' was removed'` or `<user> removed you`
|Member leaving       |`<user>' left'` or `'You left'`
|Encryption message   |`'Messages you send to this group are now secured with end-to-end encryption.'` or `'Messages you send to this chat and calls are now secured with end-to-end encryption.'`
|Admin change         |`'You're now an admin'`
|Number change        |`<user>' changed from ‪'<number>'‬ to '‪<number>` or `'changed from ‪'<number>'‬ to '‪<number>'`
|Group chat creation  |`'You created the group "'<group name>'"'` or `<user>  created this group`
|Change of subject    |`<user>' changed the subject to "'<new subject>'"'` or `'You changed the subject to "'<new subject>'`
|Location             |`<user>': location: https://maps.google.com/?q='<longitude>','<latitude>`
|Change of icon       |`<user>' changed this group's icon'` or `'You changed this group's icon'`
|Image                |`<user>': <image omitted>'`
|Audio                |`<user>': <audio omitted>`
|Video                |`<user>': <video ommited>`
|Document             |`<user>': <document omitted>'`
|Contact              |`<user>': <Contact card omitted>'`
|Text                 |`<user>': '<message>`
