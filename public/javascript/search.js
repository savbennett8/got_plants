async function searchFunction(event) {
    event.preventDefault();

    var searchTerm = document.querySelector('#search').value;

    //all posts need to be stored into an array so they can be accessed 
    //look through each post to check if it contains the word that is searched
    //create a new array of all posts that will be included in results

    const response = await fetch(`"/api/posts/search?q=" + ${searchTerm}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response) {
        //show all related posts
    } else {
        //tell the user there are no posts containing that keyword
    }
}

document.querySelector('#search-btn').addEventListener('submit', searchFunction);