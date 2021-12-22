const messAddElem = document.querySelector('.messAdd');
const errorMessElem = document.querySelector('.errorMess');

const categoryForm = document.forms.categoryForm;
categoryForm.addEventListener('submit', async (ev) => {
    ev.preventDefault();

    const formData = new FormData(ev.target);
    const { data } = await axios.post('/admin/category', formData);
    console.log('categoryForm: ', data);

    if(data.status === 'ok') {
        messAddElem.classList.remove('hidden');
    } else {
        errorMessElem.classList.remove('hidden');
    }
});

