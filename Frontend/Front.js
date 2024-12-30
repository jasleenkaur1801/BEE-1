//typing effect

document.addEventListener("DOMContentLoaded", function() {
    const text1 = "Agents. Tours. ";
    const text2 = "Loans. Homes. ";
    const typingTextLine1 = document.getElementById("typing-text-line1");
    const typingTextLine2 = document.getElementById("typing-text-line2");
    let index1 = 0, index2 = 0;
    let typingSpeed = 200;

    function typeLine1() {
        if (index1 < text1.length) {
            typingTextLine1.textContent += text1.charAt(index1);
            index1++;
            setTimeout(typeLine1, typingSpeed);
        } else {
            setTimeout(typeLine2, typingSpeed);
        }
    }

    function typeLine2() {
        if (index2 < text2.length) {
            typingTextLine2.textContent += text2.charAt(index2);
            index2++;
            setTimeout(typeLine2, typingSpeed);
        } else {
            setTimeout(resetAndStart, 1000);
        }
    }

    function resetAndStart() {
        index1 = 0;
        index2 = 0;
        typingTextLine1.textContent = "";
        typingTextLine2.textContent = "";
        typeLine1();
    }
    typeLine1();
});

//scroll reviews
const scrollContainer = document.querySelector('.top');
const scrollLeftButton = document.querySelector('.scroll-btn.left');
const scrollRightButton = document.querySelector('.scroll-btn.right');

function isMobile() {
    return window.innerWidth <= 480;
}

function checkScrollButtons() {
    if (isMobile()) {
        const isAtStart = scrollContainer.scrollLeft <= 0;
        const isAtEnd = scrollContainer.scrollLeft + scrollContainer.clientWidth >= scrollContainer.scrollWidth - 1;

        scrollLeftButton.style.display = isAtStart ? 'none' : 'block';
        scrollRightButton.style.display = isAtEnd ? 'none' : 'block';
    } else {
        // Desktop behavior
        scrollLeftButton.disabled = scrollContainer.scrollLeft === 0;
        scrollRightButton.disabled = scrollContainer.scrollLeft + scrollContainer.clientWidth >= scrollContainer.scrollWidth;
    }
}

function scroll(direction) {
    const scrollAmount = isMobile() ? 
        (direction === 'left' ? -scrollContainer.offsetWidth : scrollContainer.offsetWidth) :
        (direction === 'left' ? -200 : 200);
    
    scrollContainer.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
    });
}

scrollLeftButton.addEventListener('click', () => scroll('left'));
scrollRightButton.addEventListener('click', () => scroll('right'));

// Touch events for mobile
let startX;
scrollContainer.addEventListener('touchstart', (e) => {
    if (isMobile()) {
        startX = e.touches[0].clientX;
    }
});

scrollContainer.addEventListener('touchmove', (e) => {
    if (isMobile() && startX) {
        const x = e.touches[0].clientX;
        const diff = startX - x;
        
        if (Math.abs(diff) > 5) { // Adjust sensitivity as needed
            scroll(diff > 0 ? 'right' : 'left');
            startX = null;
        }
    }
});

scrollContainer.addEventListener('scroll', checkScrollButtons);
window.addEventListener('resize', checkScrollButtons);

// Initial check
checkScrollButtons();
//on questions
function toggleques(element) {
        const item = element.parentElement;
        const isActive = item.classList.contains('active');
    
        // Close all accordion items
        document.querySelectorAll('.ques-item').forEach(function (QuesItem) {
            QuesItem.classList.remove('active');
            QuesItem.querySelector('.ques-content').style.maxHeight = '0';
            QuesItem.querySelector('.icon').textContent = '+';
        });
    
        // If the clicked item is not active, open it
        if (!isActive) {
            item.classList.add('active');
            const content = item.querySelector('.ques-content');
            content.style.maxHeight = content.scrollHeight + 'px';
            item.querySelector('.icon').textContent = '-';
        }
    }

//mobile
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenuContent = document.getElementById('mobile-menu-content');
    const mobileDrops = document.querySelectorAll('.mobile-drop');

    mobileMenuBtn.addEventListener('click', function() {
        mobileMenuContent.style.display = mobileMenuContent.style.display === 'block' ? 'none' : 'block';
    });

    mobileDrops.forEach(drop => {
        drop.addEventListener('click', function(e) {
            e.preventDefault();
            const dropdownContent = this.nextElementSibling;
            dropdownContent.style.display = dropdownContent.style.display === 'block' ? 'none' : 'block';
        });
    });

    // Close the menu if clicked outside
    document.addEventListener('click', function(event) {
        if (!mobileMenuBtn.contains(event.target) && !mobileMenuContent.contains(event.target)) {
            mobileMenuContent.style.display = 'none';
            document.querySelectorAll('.mobile-dropdown-content').forEach(content => {
                content.style.display = 'none';
            });
        }
    });
});


const http = require('http');
const fs = require('fs');
const path = require('path');

// Create the HTTP server
const server = http.createServer((req, res) => {
    // Serve the 'front.html' file when the root path is requested
    if (req.url === '/Frontend/') {
        // Read the front.html file
        fs.readFile(path.join(__dirname, 'Front.html'), 'utf8', (err, data) => {
            if (err) {
                // If there's an error, send a 500 error response
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Error reading the HTML file');
            } else {
                // Serve the HTML content
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(data);
            }
        });
    } else {
        // For any other requests, respond with 404 (Not Found)
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Page not found');
    }
});

// Start the server on port 3000
server.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});
