# Gardenio App

React-Native app created with Expo (bare workflow).

## List of necessary software and frameworks to have installed

Please make sure that you have these softwares installed locally for your respective OS.
-`node`
-`watchman`
-`nvm`
-`react-native-cli`
MacOS:
-Xcode/Xcode CLI Tools
-`cocoapods`
Windows:
-Android Studio
-expo-cli

# Getting Started

1. Pull down the repo

2. Add secrets.js file into the `src/shared` directory. Ask another member of the team to share this with you if they haven't already done so.

3. `yarn install` inside the root directory
    Note: Make sure your node version is set to 10.15.3

4. Link the Sentry React Native Package by running `react-native link @sentry/react-native`. During this process you will need to login to Sentry, so have another team member send you an invite. Once you authenticate you should select the Gardenio/gardenio project.

5. `cd ios; pod install` to install the ios podfiles

## Simulating iOS

1. Open XCode (currently running 10.3)

2. File > Open > gdno.xcworkspace

3. Select an iOS Simulator

4. Click the "play" icon

Play should start the metro bundler (same thing as running `yarn start`) and boot up the Simulator app automatically. You may instead run `yarn start` and then go through this process.

Note: to start or stop debugging in the browser, you can do ⌘d while in the simulator and choose to start or stop the debug

In order to test in non-debug mode (build), select or create a different scheme from the dropdown in XCode

## Simulating Android

There are two ways to do this. One, is to have a device, put it in debug mode (check online for how to do this for your device), connect it to the computer, and then run `yarn android`. Otherwise you must use an IDE such as Android Studio:

1. Open this project in Android Studio

2. Open the AVD (Android Virtual Device) Manager

3. Click the "play" icon on the virtual device you'd like to simulate. If you don't have any, click "Create Virtual Device" and go through the wizard

4. Run `adb devices` to see emulators connected (both when simulation running or plugged in via USB). Install `adb` command with `brew install android-platform-tools`

5. Once you've confirmed there is an emulator available, go back to the terminal and run `yarn android`

## Contributing

1. Checkout a new branch from `main`. Use `feat/` prefix for feature work, `bugfix/` for bugfixes, `docs/` for documentation and `chore/` for other tasks (eg. Dependency bumping)

2. Test your branch using the `release` configuration for both android and ios before submitting a PR

3. Submit a pull request with your changes. Please be descriptive and give context in the summary text of the PR (screenshots encouraged!)

4. Post to #engineering slack channel with a request for review and a link to your PR

5. You may merge to the main branch once you have at least 1 approval

## Resources

* [Native Directory](https://www.native.directory/) for all kinds of libraries
