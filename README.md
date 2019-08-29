# Setup Solr
1. First download and unzip Solr which can be done from https://lucene.apache.org/solr/downloads.html
2. Inorder to run Solr, you will also need to have java installed with the JAVA_HOME system variable set to the java location
   * download Java and install
   * from the control panel > System and Security > System 
   * you should see Advanded system settings > Advanced tab > Environment Variable
   * here Edit or add a system variable for JAVA_HOME to where your java installation is
3. Start solr from the command line (or powershell) by going to the solr install folder location and typing bin\solr -start
   * note if this doesn't work you may have to use the bin\solr.cmd -start
   * Solr should start up and be runing on port 8983
4. Create a collection in solr with bin\solr create -c book -s 2 rf 2
   * note that book is the collection name, and can be replaced with whatever name you desire.
5. There should now be a new folder created in server\solr\books (or whatever you collection name was)
6. Copy the managed_schema file from the Resources\solr in the repository to server\solr\books\conf and overwrite the existing file
7. stop solr with bin\solr stop -all, and then restart with bin\solr start 
   * this is so solr can read the new schema
   * verify by going to http://localhost:8983/solr/#/books/schema, and in the fields there should be records like author, average rating, etc..

# Database setup
This application uses a sql server backend so sql server is needed to run this project
1. If you do not have sql server, download and install a version of sql server express from microsoft. 
   * Also install Sql Server Studio manager in order to manage the database server.
2.  if you are going to using sql auth on a new installation, then you may have to change your sql server settings to allow for 
   windows auth and sql auth in SSMS by right clicking on the server > properties > security > and selecting SQL server and windows authentication mode
3. you also may need to setup a user to be able to access the database with, this user should be able to create and update a database.

# Project setup
In order to run or deploy the code you will need and ide. Visual Studio is recommend and the Community version is free
1. make sure the .netcore2.2 is installed
2. In the BookListing.Website project updating the appsetting.json
   * Update the DefaultDatabase: so that the connection string can access the database that was created 
   * update the solrUrl and collection to match the url that solr is running on and the collection that was created
3. from the Package manager Console make sure that the default project is now set to BookListing.DataAccess
   * Type in >update-database
   * this should create the new database and setup all the database tables needed for your application.
4. run the application for the first time
   * this may take a few minutes as it will also seed the database and index that data in solr with some initial sample data 
   which can be found at BookListing.DataAccess\SampleData\books.csv
   * It will also create 2 users with u:pw { admin:admin } and {user: user}
