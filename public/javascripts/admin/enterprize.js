const messAddElem = document.querySelector('.messAdd');
const errorMessElem = document.querySelector('.errorMess');

const enterprizeForm = document.forms.enterprizeForm;
enterprizeForm.addEventListener('submit', async (ev) => {
    ev.preventDefault();

    const formData = new FormData(ev.target);
    const { data } = await axios.post('/admin/enterprize', formData);
    console.log('enterprizeForm: ', data);

    if(data.status === 'ok') {
        messAddElem.classList.remove('hidden');
    } else {
        errorMessElem.classList.remove('hidden');
    }
});
