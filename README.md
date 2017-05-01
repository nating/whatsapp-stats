# whatsapp-stats
A program for generating statistics about a whatsapp chat.

(On hold until the 12th of May)

## Overview
Whatsapp offers users the ability to export chats as text files.  
These text files' format make it easy to parse, and to gather interesting data from them.
 
### Chat Activity
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
 * Text Message
 
### To do:
 * Create comprehensive list of possible chat activity.
 * Write parsing code.
 * Create list of interesting queries.
 * Come up with an interesting way to display data.
