
var itemIndex=-1;
var bookList={};

$(document).ready(function(){

   
    if (localStorage.getItem("lms") ===null || localStorage.getItem("lms") ===""  ) {
       $("#bookFound").hide();
       $("#noBookFound").show();
        localStorage.setItem("lms","");
        localStorage.setItem("lmsItemIndex",-1);
       
        }
    else{
         $("#noBookFound").hide();
         $("#bookFound").show();
    
         itemIndex=localStorage.getItem("lmsItemIndex");
         displaybooks();
   
    
        }


 });

 function addBook(){
        var book={};
        book.id=++itemIndex;
        book.bookName=bookForm.bookName.value;
        book.authorName=bookForm.authorName.value;
        book.publisherName=bookForm.publisherName.value;
        book.datePublished=bookForm.datePublished.value;

        if(localStorage.getItem("lms")!=="")
        bookList=JSON.parse(localStorage.getItem("lms"));
     
       
        bookList["id"+itemIndex]=book;
        var bookDataString = JSON.stringify(bookList);
        localStorage.setItem("lms",bookDataString);        
        localStorage.setItem("lmsItemIndex",itemIndex);
    
 }
 
 function displaybooks(){
    var bookLists=JSON.parse(localStorage.getItem("lms"));
 
    
     for(var key in bookLists)
     {
        
         var row = $("<tr />")
         $("#booksTable").append(row); //this will append tr element to table...
         row.append($("<td>" + bookLists[key].id + "</td>"));
         row.append($("<td>" + bookLists[key].bookName + "</td>"));
         row.append($("<td>" + bookLists[key].authorName+ "</td>"));
         row.append($("<td>" + bookLists[key].publisherName + "</td>"));
         row.append($("<td>" + bookLists[key].datePublished + "</td>"));

         row.append($("<td>" + "actions" + "</td>"));
     }
 
  }


  $(document).ready(function(){
    $("#purgeLibrary").click(function(){
        if( confirm("do you want to delete library!"))
        {
            localStorage.removeItem("lms");
            localStorage.removeItem("lmsItemIndex");
            location.reload();
        } 
        
    
    });
});

$(document).ready(function(){
    if($('body').is('#authors_page')){
        var newArrayOfObjectData=Object.values(JSON.parse(localStorage.getItem("lms")));
        var byAuthor = newArrayOfObjectData.groupBy('authorName');
       
        var arrayOfAutherName= Object.keys(byAuthor);
        for(var i=0;i<arrayOfAutherName.length;i++){
           
            autherObjects=byAuthor[arrayOfAutherName[i]];
             
            var row = $("<tr />")
            $("#authorTable").append(row); //this will append tr element to table...
            row.append($("<td>" +arrayOfAutherName[i]  + "</td>"));
   
            var books="";
                for(var j=0; j<autherObjects.length;j++)
                {
                   
                  j==autherObjects.length-1?  books+= autherObjects[j].bookName + " ":books+= autherObjects[j].bookName + ", ";  

                }

                row.append($("<td>" +  books + "</td>"));
                row.append($("<td>" +  autherObjects.length + "</td>"));
                row.append($("<td>" + "actions" + "</td>"));

        }

      }

});

Array.prototype.groupBy = function(prop) {
    return this.reduce(function(groups, item) {
      var val = item[prop];
      groups[val] = groups[val] || [];
      groups[val].push(item);
      return groups;
    }, {});
  }



  $(document).ready(function(){
    if($('body').is('#publishers_page')){
        var newArrayOfObjectData=Object.values(JSON.parse(localStorage.getItem("lms")));
        var byPublisher = newArrayOfObjectData.groupBy('publisherName');
       
        var arrayOfPublisherName= Object.keys(byPublisher);
        for(var i=0;i<arrayOfPublisherName.length;i++){
           
            publisherObjects=byPublisher[arrayOfPublisherName[i]];
             
            var row = $("<tr />")
            $("#publisherTable").append(row); //this will append tr element to table...
            row.append($("<td>" +arrayOfPublisherName[i]  + "</td>"));
   
            var books="";
                for(var j=0; j<publisherObjects.length;j++)
                {
                   
                  j==publisherObjects.length-1?  books+= publisherObjects[j].bookName + " ":books+= publisherObjects[j].bookName + ", ";  

                }

                row.append($("<td>" +  books + "</td>"));
                row.append($("<td>" +  publisherObjects.length + "</td>"));
                row.append($("<td>" + "actions" + "</td>"));

        }

      }

});