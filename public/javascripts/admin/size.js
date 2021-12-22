const messAddElem = document.querySelector('.messAdd');
const errorMessElem = document.querySelector('.errorMess');

const sizeGridleForm = document.forms.sizeGrid;
sizeGridleForm.addEventListener('submit', async (ev) => {
    ev.preventDefault();

    const formData = new FormData(ev.target);
    const { data } = await axios.post('/admin/size', formData);
    console.log('sizeGridleForm: ', data);

    if(data.status === 'ok') {
        messAddElem.classList.remove('hidden');
    } else {
        errorMessElem.classList.remove('hidden');
    }
});