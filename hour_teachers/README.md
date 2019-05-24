This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# Hour teachers

Visit the [site](https://web-hour-teachers.firebaseapp.com/) 

## Concept

We all have found ourselves in a moment that we do not know how to approach a task it is in front of ours, and we all had felt the characteristic feeling of frustration.
For those moments, a little push can mean the difference between doing nothing or starting a new path to improve ourselves.

**Hour teachers** can help you. Learn what you need, get the solution to whatever you problem is, and don’t forget the most important: The human touch.

Through our smartphones or computers we have access to all kinds of online teaching/learning resources. We also want to give you the opportunity to take advantage of that moment to establish personal and professional relationships, that go beyond the digital field.

Share you experience with the users community and go even further of what you had imagine. **Get the right impulse.**

## Functional description

Hour teachers is a **web application** that that acts as a communication platform for the **exchange of knowledge**, and make easier meetings between users in exchange for a price per hour. This way, you will be able to **make your knowledge profitable** and simplify the path to those who are going to learn what you already know.  

Users will be able to add those subjects they are experts in and to look for those who they want to learn. Apart from this, they will be able to filter or order them based on different criteria. As well as keep in a list of favorites those subjects that wish to consult at another time.

Users will have the opportunity to do requests about the subjects that are taught, and propose a schedule for the meetings, in addition to offer their contact information. This info, may be saved for the later reference. 

This is an open platform to all kinds of knowledge, and is based on users experiences. In fact, users will actively participate, sharing their experiences and rating the best professionals in each path. 

In other less specific terms, the platform allows you to **keep in touch with professionals** in each subject, to be known in a specific field, and to **expand your knowledge and your personal circle** based on a wide range of enriching experiences.


## Data Model

![image](https://raw.githubusercontent.com/fordfarley/MiguelAngel_SkylabProject/develop/hour_teachers/UML.png)


### Database structure

#### Users
name, mail, phone, location, hosts, photo, contacts[{name,mail,phone}], talents[ids], favorites[{ids}], reviewsStudent[{value,comment}], reviewsTeacher[{value,comment}], totalReviewStudent, totalReviewTeacher, medalsStudent[ids], medalsTeacher[ids], reviewsPending[{type,idUser,}],uid

### Medals
name, type, description

### Talents
name, location, price, description, tags[], img, reviews[{value,comment}], teacher, teacherName, totalReview



