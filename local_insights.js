// Local Insights JS
// TODO: Implement community reviews, tips, and points system interactivity
//comminuty reviews, tips, and points system interactivity
document.getElementById('placeForm').addEventListener('submit', function(e) {
    e.preventDefault();
  
    // Optionally collect and log the values
    const title = document.getElementById('title').value;
    const desc = document.getElementById('description').value;
    const cost = document.getElementById('cost').value;
    const time = document.getElementById('timing').value;
    const tags = document.getElementById('tags').value;
  
    console.log("Place Submitted:", { title, desc, cost, time, tags });
  
    // Show confirmation
    const confirmation = document.getElementById('confirmation');
    confirmation.classList.remove('hidden');
  
    // Optionally reset form
    document.getElementById('placeForm').reset();
  });
  
  function resetForm() {
    document.getElementById('placeForm').reset();
    document.getElementById('confirmation').classList.add('hidden');
  }