# DreamStream

A dream tracker and analyzer brought to you by the Dream Team!

This is a mobile application, but you can run it on your browser to see how it works. Check it out here: https://dreamstream.firebaseapp.com 

Demo screencast: https://vimeo.com/157201586

Backend repo: https://github.com/IanSmith89/dreamStream_backend

## Description

Our dream tracker application helps you keep track of your dreams. You can describe the each dream and give it a rating. You can also track your mood (overall life stress) at that time and the duration of sleep.

All data inputs are calculated and visualized in charts to show average mood, average rating, and mood compared to rating. The data is analyzed by Watson Personality Insights API and shows a pie chart of how your dreams reflect your personality.

The common words from the dreams are populated into a word cloud. Filters are added to exclude common words like "a, the, and, etc." You can also add custom word filters to exclude any other common words that you do not want to see in your word cloud.


## Technologies
  * HTML
  * CSS, SASS
  * JavaScript
  * Ionic
  * Angular
  * IBM Watson Personality Insights API
  * D3 Data Visualizations
    * [d3-cloud by Jason Davies](https://github.com/jasondavies/d3-cloud#cloud)
  * [HighCharts](https://github.com/pablojim/highcharts-ng)

## Screenshots
![Sign in](https://github.com/IanSmith89/dreamStream/blob/master/screenshots/DreamStream_sign%20in.png "Sign in")
![Add new dream](https://github.com/IanSmith89/dreamStream/blob/master/screenshots/DreamStream_add%20new.png "Add new dream")


![Stream](https://github.com/IanSmith89/dreamStream/blob/master/screenshots/DreamStream_stream.png "Stream")
![Word Cloud](https://github.com/IanSmith89/dreamStream/blob/master/screenshots/DreamStream_word%20cloud.png "Word Cloud")


![Personality Analysis](https://github.com/IanSmith89/dreamStream/blob/master/screenshots/DreamStream_personality%20analysis.png "Personality Analysis")
