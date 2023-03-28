# Description

This project is an upgraded version of the Jungle Frogger game, written using only HTML, CSS and JavaScript.

# Deployment link

https://gael-duchesne-jungle-frogger-v2.netlify.app/

# Timeframe & Working Team (Solo/Pair/Group)

The project is a week long and was completely individual.

# Technologies Used

- HTML
- CSS
- JavaScript
- Excalidarw

# Brief

- Render a game in the browser
- Be built on a grid, no HTML canvas
- Design logic for winning and visually display which player won
- Include separate HTML, CSS and JavaScript files
- Use JavaScript for DOM manipulation
- Deploy your game online

Necessary deliverables:

- A working game, built by you, hosted somewhere on the internet
- A link to your hosted game in the URL section of your GitHub repository
- Git repository hosted on GitHub, with a link to your hosted game, and frequents commits dating back to the very beginning of the project
- A “readme” file with explanations of the technologies used, the approach taken, installation instructions, unsolved problems, etc.


# Planning

On day 1 I started by sketching my future game main features (main character, enemies, background, grid).
My game is a frogger so it consists of a main character evolving across the grid, trying to dodge waves of obstacles and trying to reach the finish line.
I came with the idea of a jungle-styled game with animals (see the wireframe below).

<img width="696" alt="image" src="https://user-images.githubusercontent.com/113553373/213197677-ee4bcaff-2c98-4065-9046-fe9cdddd522d.png">


Once that sketching was done, I had a very clear idea of where to start, create the elements on HTML (grid container), start button etc.

# Build/Code Process

I started by creating basic elements with HTML, the grid container, a start button, lives and a score.
Then I used JavaScript to create all the cells in the grid. It is a 10x10 grid on purpose, to make coding simpler for my first project. The JavaScript coding part uses DOM manipulation, which requires grabbing elements from the HTML, via in-built methods such as querySelector. See the snippet below for the creation of the grid:

<img width="411" alt="image" src="https://user-images.githubusercontent.com/113553373/213197975-3f61d861-9816-440d-84df-a82f166ad2ec.png">
<img width="543" alt="image" src="https://user-images.githubusercontent.com/113553373/213198052-6905c81a-5dfa-42ff-8311-e2aa0ccdc91a.png">



Then I added functions for the movement of the main character (movement is made using arrow keys) on the grid:

<img width="559" alt="image" src="https://user-images.githubusercontent.com/113553373/213200846-b7f2a46a-a540-4d67-b7b1-f073ecdbee42.png">


On day 2 I worked on the background visuals., Each cell being an element of the cells array, I could simply add CSS classes to each one of them to visually create my background:

<img width="453" alt="image" src="https://user-images.githubusercontent.com/113553373/213200932-6cf14b48-059d-4396-b81e-c8a59a799807.png">

<img width="639" alt="image" src="https://user-images.githubusercontent.com/113553373/213200987-89b4899b-c965-4209-89da-21ada06baf02.png">


For the moving elements on the screen, I opted to create an Enemy JavaScript class:

![image](https://user-images.githubusercontent.com/113553373/213201152-ca1d55b0-a7b1-4f37-a83a-929e47c5a5a1.png)

Each Animal instance has specific parameters, such as ‘name’, ‘starting position’ and ‘final position’ and the Animal class has methods that handle their movement.
I coded the movement of the animals intuitively without any planning and it seemed to work, but I ran into problems later on when I had to clear the intervals. I could not access them.
Inserting time intervals within the methods was retrospectively probably a bad idea as I struggled thereafter to access these intervals and was not able to clear it.

I followed by creating instances of my class:

![image](https://user-images.githubusercontent.com/113553373/213201221-e1811dde-579a-4115-b8c7-4cb6042aeebb.png)

On day 3 I worked on the event listeners that I would add to the game, including one for the Start button.
That event listener triggers a callback function that starts a new game.

![image](https://user-images.githubusercontent.com/113553373/213201272-4a042a28-5e7f-45dc-aee1-c4f1c75d3a8e.png)

On day 4 I worked on the collision detection  and on the win/loss conditions.

![image](https://user-images.githubusercontent.com/113553373/213201327-924acf5f-67eb-4ef7-b75b-bd15fc30cd3e.png)


When the hero faces an enemy, a function hitsHero is triggered, which plays some sounds depending on the nature (CSS class) of the obstacle, hero loses lives, etc. After each collision, a prompt shows up to explain what happened, and after 3 collisions, the user loses the game, a message pops up, via the innerHTML method:

![image](https://user-images.githubusercontent.com/113553373/213201417-180ebf1c-ba04-4be3-be5b-0b4309d4e367.png)

Similarly, when the user wins, a message pops up, specifying the score:

![image](https://user-images.githubusercontent.com/113553373/213201464-5e3253e9-c63e-4e62-baaa-b0a92fc4d5b9.png)

Movement of the hero is also frozen via the method removeEventListener.
Then I added a few extra features to the game such as a number of lives displayed for the user, and a score display (time elapsed) with a local storage functionality.

At this stage my Minimum Viable Product was finished and I had a bit more time so on days 5, 6 and 7 I worked on adding a second level of difficulty to the game, and extra features such as a number of lives displayed for the user, and a score display (time elapsed) with a local storage functionality.

In order to create a second level of difficulty, my idea was to create another start button, linked to another event listener, triggering a function that creates a second background (more enemies).Animals also move faster, via extra class methods. You can see the function for 
generating the second background below:

![image](https://user-images.githubusercontent.com/113553373/213201531-7ddcf408-f96c-4e5c-a068-4f5eb8410aaa.png)

I also worked on one last thing, the score in hard mode is stored and displayed independently:

![image](https://user-images.githubusercontent.com/113553373/213201586-94c69af3-3b70-4fc8-9e2b-1ea87d596352.png)








# Challenges

The time intervals were the challenge. I could not access the main ones, therefore was not able to create any pause or reset button.
My game isn’t so smooth to play because of that. The user has to refresh the page every time he wants to start a new game.
For my next projects, I will be more careful of how to code my functions, so that they’re more intelligently splitted in several small functions. It will enable me to more easily manoeuvre around them and add more code to my program smoothly.

I also faced a challenge with the sounds, sometimes not working and I couldn't stop them by using audio.stop() nor audio.pause(). After some research, I used a detour with a little bypass using muted.true.

I faced a last challenge with the addition of HTML content via the DOM, as adding one piece of content was easy, but creating a whole new variety of elements, for example when the player wins, came across as a tricky task.

# Wins

I’m happy about the fact that my project meets all the requirements, and also contains extra functionalities.
This game is playable and for my first project I think it is a win, as I came across a lot of bugs, problems with my declaration of variables, struggling with finding which methods to use etc. but almost always found a solution, either by reviewing my code or searching for help on the internet.
I worked on a variety of aspects of coding which is a very good practice.

# Key Learnings/Takeaways

I feel way more comfortable with HTML and JavaScript. I got rid of this ‘blank page fear’ of where to start.
A project like that for a beginner is scary at first.
But now, I’ve seen that by going step by step with a scientific approach, with looking for some clues in the same time online, looking at how the other developers approached the issues, etc, made me realise that with determination and perseverance I’m able to solve problems one by one.
The main takeaway from this project is that I need to be careful at first , not jumping straight to coding, and think more about my plan and clean my code progressively to avoid any future problems that in the end delay the development of the project substantially.

# Bugs

I faced little bugs with the sounds. Sometimes it was just not working. I still don’t know why.
I wanted to enable the game to play a song right after the loading of the DOM content, but was unsuccessful at it.
And I had to bypass a detour to stop the songs, as the basic in-built methods to manage the audio were not working.


# Future Improvements

I will definitely revisit my code for this project, as I feel that my code is unclean, extra long, and not easily usable for adding extra functionalities.
I feel that it is a bit rigid. So I would definitely rework my main enemy-movement functions and set intervals in a smarter way to be able to clear them easily, and therefore add a pause button etc.
I could also use ternary statements instead of long conditionals.
I’m also repeating myself on numerous occasions and I have to make an effort to make my code look shorter and sharper.




