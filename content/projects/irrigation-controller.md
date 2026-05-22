---
title: Irrigation Controller
order: 0
year: 2021-current
kind: Project
blurb: A long term project to replace our old dumb controller with something that I could control through Home Assistant.
color: "#E1665B"
cover:
  src: https://f004.backblazeb2.com/b2api/v1/b2_download_file_by_id?fileId=4_z8f907fb55c4c22b29911051f_f11539a72e26bbedf_d20260517_m214006_c004_v0402001_t0016_u01779054006498
---

This has been one of my longest-running projects. What started as an intro into embedded systems and an effort to have more control over our old sprinkler controller turned into a bit of an always improving project that I could sink my teeth into whenever leisure time presented itself.

## First Iteration

![initial setup](https://f004.backblazeb2.com/b2api/v1/b2_download_file_by_id?fileId=4_z8f907fb55c4c22b29911051f_f1152a4ba9be00aea_d20260517_m213804_c004_v0402017_t0016_u01779053884071)

The first iteration of this project consisted of our old sprinkler box with large chunks of the interior of the case dremeled out. It had an indicator light, the relays to turn the valves on and off, and an Arduino Uno WiFi Rev2 for the brain of the system. It also had buttons for manual control that, in practice, didn't work as expected.

There were a few pain points with this system

- Two power supplies were needed. One 5V for the Arduino and another 18V for the sprinkler.
- The buttons didn't work reliably
- The internet connection would time out after a few weeks of uptime.
- The entire thing was written off the back of the Arduino C example template. It was very simplistic, and there was no HAL or atomic principles applied to it.

These pain points would be addressed in due time.

## Second Iteration

The next step was to remove the need for dual power inputs.

![A single power supply](https://f004.backblazeb2.com/b2api/v1/b2_download_file_by_id?fileId=4_z8f907fb55c4c22b29911051f_f1044ed07ead95f74_d20260517_m213803_c004_v0402013_t0043_u01779053883779)

I got some cheap voltage converters online and was able to use the sprinkler valve power supply to power the Arduino. However, when doing this, I managed to fry the Uno WiFi Rev2 I had, so I needed to replace it with a smaller one I had lying around that could communicate over WiFi.

## Third Iteration

For the third iteration, I started playing around with 3D printing the enclosure so I could get rid of the old box.

![Initial 3D-printed enclosure](https://f004.backblazeb2.com/b2api/v1/b2_download_file_by_id?fileId=4_z8f907fb55c4c22b29911051f_f1014a0c7be017a71_d20260517_m215524_c004_v0402006_t0001_u01779054924301)

There was not much room in this enclosure, so I used some of the separate relays to free up some space. Along with that, I added space for an OLED screen and an encoder to take user input. This functionality didn't exist yet but would be added in the current iteration.

![A later, earlier iteration of the enclosure](https://f004.backblazeb2.com/b2api/v1/b2_download_file_by_id?fileId=4_z8f907fb55c4c22b29911051f_f1018ca0ef487086d_d20260517_m221953_c004_v0402035_t0029_u01779056393166)

## Current Iteration

For the current iteration, as an effort to get more familiar with AI-assisted development tools, I decided to work on a complete rewrite of the system using PlatformIO to support easier testing and development. I specifically used Claude Code to help with this effort.

I also used this chance to add features to support the additional hardware I added, the encoder and OLED display.

![Printing the current iteration](https://f004.backblazeb2.com/b2api/v1/b2_download_file_by_id?fileId=4_z8f907fb55c4c22b29911051f_f100a4a52ac9b8d73_d20260517_m221952_c004_v0402011_t0056_u01779056392919)

![video:Timelapse of printing](https://f004.backblazeb2.com/b2api/v1/b2_download_file_by_id?fileId=4_z8f907fb55c4c22b29911051f_f1144e8cea8c09b1e_d20260517_m224845_c004_v0402035_t0052_u01779058125276)

Being able to use Claude to work on these features was an incredible help. Being able to architect a system, review the results, and learn how actual complex embedded systems work was a catalyst for my development. I was able to create a functionally better product that I could use every day manually, which I couldn't before. It also gave me valuable experience that I could apply at work in this incredibly fast-paced market.

The current iteration can be controlled manually over WiFi and emits MQTT events based on its status that I report on in Home Assistant. The GitHub can be found [here.](https://github.com/andrewcgraves/irrigation-controller)
