const messAddElem = document.querySelector('.messAdd');
const errorMessElem = document.querySelector('.errorMess');

const uploadsSingleForm = document.forms.uploadsSingle;
uploadsSingleForm.addEventListener('submit', async (ev) => {
    ev.preventDefault();

    const formData = new FormData(ev.target);
    const { data } = await axios.post('/admin/image', formData);
    console.log('uploadsSingleForm: ', data);

    if(data.status === 'ok') {
        messAddElem.classList.remove('hidden');
    } else {
        errorMessElem.classList.remove('hidden');
    }
});