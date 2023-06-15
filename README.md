# 2D JS game

## Matrix
I basically just tried to simulate a screen (again) but this time in JS. In electricity, all circuits are mostly linear and since al pixels are connected in a chain in an array,
I tried to figure out how to make a matrix out of it. Note that the method I used is definitly not the best but in my opinion it's still pretty much summing up how
x and y coordinates and matrix is simulated for screens. I decided to create a div and added other divs inside of it that will be considered as the pixels.
I defined a width and height for the screen and basically since I'm too lazy to make fancy css stuff I just added a \<br\> after every pixel that is considered the last of it's
row. and that's pretty much how I created the "physical" display. I did not implement any x and y coordinates system since I'm a bit lazy (again) but the computer is pretty
much using the good logic to navigate in the grid and set it's bounds.

## The game
So for game the way I change the things is (weirdly) not with a framerate, refresh rate or whatever you like to call it but instead I just added classes to each of my pixels
and whenever a pixel is "filled" or occupied well it got a class and when it's not occupied anymore well there's just no more classes. Now I know what you might say: "It's actually a refreshrate since your computer screen is constantly getting redrawn but I did not simulate any interval to clear the grid and redraw it again after a certain amount of time".
The player can move with WASD and use mouseclick1 and 2 to place or break blocks. How the game starts is the program places the player in a random location and then later 
on the map generates a certain amount of blocks or "terrain" randomly with taking care of not "deleting" or occupying the player's position 
(which happened during development and made me realize I needed to do something about it). I was a bit inspired
by an old flash game called bad ice cream which was available on the old FRIV menu. Basically just moving around and destroying blocks and placing them. Sadly there's no mobs yet. 
Maybe somedays I'll add some. But yeah again this project was just for my own understanding on how 2D matrix and simulation of screens actually work under the hood and decided
to make a game out of it. It was also a bit of a pain to set the bounds of the map so the player can't just like move left on the border and then make it move back to the previous line
at the other side but I figured out with some basics modulus logic. So yeah, I hope you enjoy this little project I made, I'll try to keep updating it over time.
