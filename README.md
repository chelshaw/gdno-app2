# Gardenio App

React-Native app created with Expo.

# Getting Started

1. Pull down the repo

2. `yarn install` inside the root directory
    Note: Make sure your node version is set to 10.15.3

3. `cd ios; pod install` to install the ios podfiles

4. `yarn ios` should start the metro bundler (same thing as running `yarn start`) and boot up the Simulator app automatically. You may instead run `yarn start` and then `yarn ios`

Note: to start or stop debugging in the browser, you can do ⌘d while in the simulator and choose to start or stop the debug

## Simulating Android

There are two ways to do this. One, is to have a device, put it in debug mode, connect it to the computer, and then run `yarn android`. Otherwise you must use an IDE such as Android Studio:

1. Open this project in Android Studio

2. Open the AVD (Android Virtual Device) Manager

3. Click the "play" icon on the virtual device you'd like to simulate. If you don't have any, click "Create Virtual Device" and go through the wizard

4. With the device playing, go back to the terminal and run `yarn android`

## Resources

* [Native Directory](https://www.native.directory/) for all kinds of libraries
