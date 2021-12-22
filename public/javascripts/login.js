const firstBlockElem = document.querySelector('.firstBlock');
const secondBlockElem = document.querySelector('.secondBlock');
const invalidMessageElem = document.querySelector('.invalidMessage');

const signInClickBtn = document.querySelector('.signInClick');
const signUpClickBtn = document.querySelector('.signUpClick');

signInClickBtn.addEventListener('click', (ev) => {
    ev.preventDefault();

    firstBlockElem.classList.add('hidden');
    secondBlockElem.classList.remove('hidden');
});

signUpClickBtn.addEventListener('click', (ev) => {
    ev.preventDefault();

    secondBlockElem.classList.add('hidden');
    firstBlockElem.classList.remove('hidden');
});

const signInForm = document.forms.signInForm;
signInForm.addEventListener('submit', async (ev) => {
    ev.preventDefault();

    const formData = new FormData(ev.target);
    const { data } = await axios.post('/login/signUp', formData);
    console.log('signInForm: ', data);

    if(data.user.status === 'client added') {
        window.location.href = '/';
    } else {
        invalidMessageElem.classList.remove('hidden');
    };

});

const signUpForm = document.forms.signUpForm;
signUpForm.addEventListener('submit', async (ev) => {
    ev.preventDefault();

    const formData = new FormData(ev.target);
    const { data } = await axios.post('/login/signIn', formData);
    
    if(data.user.status === 'ok') {
        console.log('signUpForm: ', data);

        window.location.href = '/';
    } else {
        invalidMessageElem.classList.remove('hidden');
    };
    
})


