const navigationData = [
    { name: 'HomePlanet', url: 'index.html' },
    { name: 'The Blog hole', url: 'Blogs.html' },
    { name: 'Designing Mars', url: 'Design.html' },
    { name: 'Data Visualization', url: 'Data.html' },
   
  ];

  const navigation = document.getElementById('navigation');
  navigationData.forEach(page => {
  const link = document.createElement('a');
  link.href = page.url;
  link.textContent = page.name;
  navigation.appendChild(link);
});

const currentPageURL = window.location.href;
const navigationLinks = document.querySelectorAll('#navigation a');

navigationLinks.forEach(link => {
  if (link.href === currentPageURL) {
    link.classList.add('Active'); 
  }
});