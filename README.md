# Oscar Website

## Description:
Our website allows users to look up Oscar nominated movies as well as the winners. It also gives the users the ability to look up which categories the movies were nominated in and wether they won the prize or not. This also includes information about the nominated actors and the winners as well.

## Information regarding REST API's and related Endpoints

### 1. Collection Resource Endpoint
This respective End point returns a collection in JSON when prompted by the user. The user inputs the category as well as the year and all the nominees of that year under that category are returned in JSON format. 

**API DOCUMENTATION=** */movies/categories/:categoryName/:year* 

### 2. Singleton Resource Endpoint
This respective End point returns a single result after the parameters are defined by the users. The user is required to specify the year and enter winner. This in turn will return a single movie that won the Oscar that year. The result is in JSON format as well.

**API DOCUMENTATION=** */movies/categories/:categoryName/:year/type/winner*

### 3. Category Resource Endpoint
This respective End point returns a collection result as well after the category is specified by the user as well as the year. The user is required to specify the category needed to be searched as well as the year for the search. The result will show all the nominees for that specific category that were nominated for that year.

**API DOCUMENTATION=** */movies/search*


## Contributers:
