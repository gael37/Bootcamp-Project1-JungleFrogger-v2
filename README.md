# Description

This project is an upgraded version of the Jungle Frogger game, written using only HTML, CSS and JavaScript.

You can access the initial version of the project via these links:
- Previous version repository: https://github.com/gael37/Bootcamp-Project1-JungleFrogger
- Previous version deployment link: https://gael-duchesne-jungle-frogger-v1.netlify.app

# Deployment link

https://gael-duchesne-jungle-frogger-v2.netlify.app/

# Timeframe & Working Team (Solo/Pair/Group)

I allocated a couple of days for implementing my improvements.

# Brief

- Adding a 'reset' button
- Adding a 'pause' button
- Fixing some sound effects
- Adding in-game messages/hints depending on the progression of the user.
- Improving the design of the game messages when game lost/won.

# Build/Code Process

The main thing I had to do for implementing 'reset' and 'pause' functionalities was working on my timers.
In the initial version of this project, I had managed the enemies movements by setting an interval within the enemies class method. As a result, I could not access this timer globally.

So in this reworked version, I modified the class method to handle the movement of the enemies, without any interval:
![image](https://user-images.githubusercontent.com/113553373/228225730-2beb9000-5b82-4194-8b40-3650b2f6d76a.png)

The interval variable at which the enemies move is set globally:
![image](https://user-images.githubusercontent.com/113553373/228226147-a5a05391-93ee-40ee-a5ac-32d0e30040d2.png)

Them whenever the game starts, this timer global variable is set (I have two timers, one for the normal speed enemies, the other for the fast moving ones):
![image](https://user-images.githubusercontent.com/113553373/228226575-2c357ff9-c65d-4b30-953a-33ffad94a49e.png)

The reset and pause functionalities are implemented using an event listener on click on the latter buttons. I also use booleans to set some control flow in order to display and execute different things depending on whether the game is paused, reset or running:
![image](https://user-images.githubusercontent.com/113553373/228227602-a5ce188c-b7aa-4e7a-97dd-60514b071516.png)


# Challenges

The main challenge here was to refactor badly written code. I had to read through my previous code and had to use many console logs to puzzle things out.

# Wins

All my new features and modifications went through, so my game is at least more confortable to play with this reset and pause functionalities, as no page refresh is no longer needed to restart the game.
The little messages hints displayed in-game make the experience a bit more interesting.

# Key Learnings/Takeaways

The main takeaway is that it is an unpleasant experience to go through code that:
- is badly commented
- repeats itself
- has a lot of hard-coded pieces
- has CSS IDs instead of classes
- is not sectionned into functions and relevant sections

Having reviewed my own code I was able to reflect on the way I should write it in the future.
I was able to grasp the importance of using modular components to improve reusablity and readability of the code.






