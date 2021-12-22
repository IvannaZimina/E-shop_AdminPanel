const messAddElem = document.querySelector('.messAdd');
const errorMessElem = document.querySelector('.errorMess');
const nameProdSelect = document.querySelector('.nameProd');

const updateProductForm = document.forms.updateProductForm;
updateProductForm.addEventListener('submit', async (ev) => {
    ev.preventDefault();

    const formData = new FormData(ev.target);
    const { data } = await axios.post('/admin/update', formData);
    console.log('updateProductForm: ', data);

    if(data.status === 'ok') {
        messAddElem.classList.remove('hidden');
    } else {
        errorMessElem.classList.remove('hidden');
    }
});

const getInform = async () => {
    const { data } = await axios.get('/admin/server');
    return data;
};

const renderNameProductOptions = async () => {
    const { product } = await getInform();
    const cards = product.reduce( (acc, item) => {
        acc = `${acc}<option value="${item._id}">${item.name}</option>`;
        return acc;
    }, '');
    nameProdSelect.innerHTML = cards;
};

const run = () => {
    renderNameProductOptions();
};
run();
