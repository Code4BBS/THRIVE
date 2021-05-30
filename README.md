# THRIVE

<img src="https://user-images.githubusercontent.com/64681029/120106489-b7dfcb00-c17a-11eb-8d87-25a244de72a4.png" width="300px" height="170px" align="center"/>

***One stop solution for students for college activities***

Since the second wave of Covid-19 is resurfacing, we need to think twice before interacting with someone. The colleges have been shut down and the student interactions with their peers and seniors have been hampereed. This has also posted a problem effective study material and assignment managements.

***This portal servers as a solution to the problems***

<!-- The portal enables students to discover the students in the college who share common interests, post projects open for collaboration and ask questions about college. 
It also has a classroom management system where teachers and students activities can be managed, teachers can post, study materials and assignments,which the students can submit before given deadlines. Classroom also has the facility to chat in realtime. -->

**THRIVE**  is a one stop solution for having eve efficient online education to quality student life. We provide solutions to classroom management, improving student interactions, project collaborations, college activities and many more. The portal allows both students and faculty to manage their activities.

The main aim of the portal is to provide an easy-to-use all-in-one solution for dealing all activities associated with any educational institution online without any limitations.


## Technologies used

- **NodeJs** - evented I/O for the backend
- **Express** - fast node.js network app framework
- **Socket.io** - Package used to create realtime chats.
- **MongoDB** - NoSQL Database
- **React.js** - Javascript llibrary to build user frameworks.
- **GoogleOAuth** - Open Authorization from Google
- **MaterialUI** - React components based on Material Design.


## Running the WebApp locally

Install the Node Package Manager latest version 
```
$ npm install npm@latest-g
```
Fork this repo and clone it
```
$ git clone https://github.com/<Your User Name>/THRIVE.git
```
Open the folder THRIVE and install the dependencies.<br/>
Ask us for the environment variables and create a .env file.
```
$ cd ./THRIVE
$ npm install
$ npm start
```
Open the client folder in different terminal and install the dependencies
```
$ cd ./THRIVE/client
$ npm i
$ npm start
```
The backend server and client server run at ports 3000 and 3001 i.e. http://localhost:3000/ and http://localhost:3001/ respectively.  

## Features

The panel is a platform for students to post their projects and ask for collaborators. 
<p>
Project details include basic details like title, description along tags and present collaborators.<br/>
Thus it provides a list of projects avialable in the college, to which students can request to join. Owners can approve or reject the requests. 
Projects are equipped with tags to enhance filtering and sending notifications to students with the tags.





<hr/>

# Pages

**Login Page**

![image](https://user-images.githubusercontent.com/64681029/120107303-368a3780-c17e-11eb-9f35-10adaee818ff.png)
 
<br/>

**User Profile**: Show and edit the information of the user. Students can view profiles of their peers.

<img src="https://user-images.githubusercontent.com/64681029/120107112-53723b00-c17d-11eb-97cf-2e8c8beaa54f.png"/>

**Editing Profile**:

![image](https://user-images.githubusercontent.com/64681029/120107422-9680de00-c17e-11eb-9a1e-b7b8b16aabd8.png)

<br/>

**Discover Feature**: 
<br/>
A directory of students in college which supports search based on name, email, skills, positions of responsibilities, student activities and, of course, branch and year.

![image](https://user-images.githubusercontent.com/64681029/120107490-ce882100-c17e-11eb-8095-51c187bc2142.png)

Search by tags: 

![image](https://user-images.githubusercontent.com/64681029/120107573-20c94200-c17f-11eb-89a5-93e214c8a889.png)


**Projects Panel**: 
<br/>
Admin has option to blacklist the project to prevent unnecessary spamming. 
</p>

**All Projects**
![image](https://user-images.githubusercontent.com/64681029/120107755-d5636380-c17f-11eb-9bf3-b0b3fdeca121.png)
<br/><br/>
**Post Project**
![image](https://user-images.githubusercontent.com/64681029/120107818-19566880-c180-11eb-9cd3-2eadda7e8978.png)
<br/><br/>
**View Project**
![image](https://user-images.githubusercontent.com/64681029/120107835-3428dd00-c180-11eb-845c-b35754bb97dc.png)
<br/><br/>
**Request to Join**
![image](https://user-images.githubusercontent.com/64681029/120107985-caf59980-c180-11eb-9869-e5e2afa822bb.png)
<br/><br/>
**Project Owner Options**:&nbsp; &nbsp;This includes option to edit, delete and accept/reject collab requests.
![image](https://user-images.githubusercontent.com/64681029/120108018-f24c6680-c180-11eb-9fed-a8b76450d56f.png)
<br/><br/>


**Discussion**: 
A forum where students can ask questions to each other and their seniors. The forum also allows anonymous questions and answers to allow free expression of views.

![image](https://user-images.githubusercontent.com/64681029/120108211-d1d0dc00-c181-11eb-93e7-3dd26e88a6c8.png)
<br/><br/>

**Post Question**
![image](https://user-images.githubusercontent.com/64681029/120108273-1197c380-c182-11eb-9f16-63e0d538b010.png)

**View A Question and Answer it**
![image](https://user-images.githubusercontent.com/64681029/120108298-31c78280-c182-11eb-958a-6ecfe4102582.png)

**Classroom Management**

**Courses**
![image](https://user-images.githubusercontent.com/64681029/120108665-dd250700-c183-11eb-8636-6cda373b044a.png)

**Assignment Timeline of Course**
![image](https://user-images.githubusercontent.com/64681029/120108892-bddaa980-c184-11eb-9761-2faed6f0bad3.png)

**Classroom Chat**
![image](https://user-images.githubusercontent.com/64681029/120109061-6ee14400-c185-11eb-96b7-18c499404a02.png)

**Deadline Calender for Students**
![image](https://user-images.githubusercontent.com/64681029/120108938-f4182900-c184-11eb-8d4e-befd03e02df3.png)


<br/><br/>
**Faculty Options**
<br/>
Enroll Students
![image](https://user-images.githubusercontent.com/64681029/120109116-b1a31c00-c185-11eb-9461-d47c4c83b8dc.png)

<br/>
Post Assignments

![image](https://user-images.githubusercontent.com/64681029/120109149-dac3ac80-c185-11eb-91f4-c3751aa9aa54.png)

<br/>
View Submissions

![image](https://user-images.githubusercontent.com/64681029/120109165-eadb8c00-c185-11eb-9816-00f874931985.png)

<br/><br/>
**Admin Actions**

**College Admin**
<br/>
Add New Courses with a teacher
![image](https://user-images.githubusercontent.com/64681029/120109276-502f7d00-c186-11eb-8b14-966425189655.png)

<br/>

**Student Admin**

Blacklist Projects and Questions

![image](https://user-images.githubusercontent.com/64681029/120109321-8ec53780-c186-11eb-8ab4-f868013f8571.png)

<br/>

![image](https://user-images.githubusercontent.com/64681029/120109345-a7355200-c186-11eb-93f9-b794a28c1908.png)


<br/>


## Contributors

- **[Navaneeth Bysani](https://www.linkedin.com/in/navaneeth-bysani-639b4219a/)**
- **[P Kartikeya](https://www.linkedin.com/in/kartikeya-pochampalli-29a0a319b/)**
- **[Sai Krishna Jupally](https://www.linkedin.com/in/sai-krishna-jupally-b7050177/)**
- **[Shrirang Deshmukh](https://www.linkedin.com/in/shrirang-deshmukh/)**

> Contact anyone of the contributors for any queries at LinkedIn profiles.

## SmartyPants

SmartyPants converts ASCII punctuation characters into "smart" typographic punctuation HTML entities. For example:

|                |ASCII                          |HTML                         |
|----------------|-------------------------------|-----------------------------|
|Single backticks|`'Isn't this fun?'`            |'Isn't this fun?'            |
|Quotes          |`"Isn't this fun?"`            |"Isn't this fun?"            |
|Dashes          |`-- is en-dash, --- is em-dash`|-- is en-dash, --- is em-dash|


