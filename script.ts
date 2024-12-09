// get refrences to the form and display area
const form = document.getElementById('resume-form') as HTMLFormElement;
const resumeDisplayElement = document.getElementById('resume-display') as HTMLDivElement;
const shareableLinkContainer = document.getElementById('shareable-link-container') as HTMLDivElement;
const shareableLinkElement = document.getElementById('shareable-link') as HTMLAnchorElement;
const downloadPdfButton = document.getElementById('download-pdf') as HTMLButtonElement;

//handle form submission
form.addEventListener('submit', (event: Event) => {
    event.preventDefault(); //prevent page reload

    //collect input values
    const username = (document.getElementById('username') as HTMLInputElement).value;
    const name = (document.getElementById('name') as HTMLInputElement).value;
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const phone = (document.getElementById('phone') as HTMLInputElement).value;
    const education = (document.getElementById('education') as HTMLTextAreaElement).value;
    const experience = (document.getElementById('experience') as HTMLTextAreaElement).value;
    const skills = (document.getElementById('skills') as HTMLTextAreaElement).value;

    // save from data in local storage with the username as the key
    const resumeData = {
        name,
        email,
        phone,
        education,
        experience,
        skills,
    };
    localStorage.setItem(username, JSON.stringify(resumeData));  // saving the data locally

    // generate the resume contant dynamically
    const resumeHTML = `
    <h2><b>Editable Resume</b></h2>
    <h3>Personal Information</h3>
    <p><b>Name:</b> <span contenteditable="true">${name}</p>
    <p><b>Email:</b> <span contenteditable="true">${email}</p>
    <p><b>Phone:</b> <span contenteditable="true">${phone}</p>

    <h3>Education</h3>
    <p> contenteditable="true">${education}</p>

    <h3>Experience</h3>
    <p> contenteditable="true">${experience}</p>

    <h3>Skills</h3>
    <p> contenteditable="true">${skills}</p>         
    `;

    // display the generate resume 
    resumeDisplayElement.innerHTML = resumeHTML;

    // generate a shareable url with the username only 
    const shareableURl =
    `${window.location.origin}?username=${encodeURIComponent(username)}`;

    //display the shareable link
    shareableLinkContainer.style.display = 'block';
    shareableLinkElement.href = shareableURl;
    shareableLinkElement.textContent = shareableURl;
});

//handle pdf download
downloadPdfButton.addEventListener('click' , () => {window.print(); //this will open the print dialog and allow the user to save as pdf
    });

    //prefill te form based on the username in the url
    window.addEventListener('DOMContentLoaded' , () => {
        const urlParams = new URLSearchParams(window.location.search);
        const username = urlParams.get('username');

        if (username) {
            //autofill form
            const savedResumeData = localStorage.getItem(username);

            if (savedResumeData) {
                const resumeData = JSON.parse(savedResumeData);
                (document.getElementById('username') as HTMLInputElement).value =username;
                (document.getElementById('name') as HTMLInputElement).value = resumeData.name;
                (document.getElementById('email') as HTMLInputElement).value = resumeData.email;
                (document.getElementById('phone') as HTMLInputElement).value = resumeData.phone;
                (document.getElementById('education') as HTMLInputElement).value = resumeData.education;
                (document.getElementById('experience') as HTMLInputElement).value = resumeData.experience;
                (document.getElementById('skills') as HTMLInputElement).value = resumeData.skills;


            }
        }
    });

