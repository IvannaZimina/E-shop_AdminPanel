const categoryProdSelect = document.querySelector('.categoryProd');
const nameEnterSelect = document.querySelector('.nameEnter');
const sizeProdSelect = document.querySelector('.sizeProd');
const imageProdSelect = document.querySelector('.imageProd');

const messAddElem = document.querySelector('.messAdd');
const errorMessElem = document.querySelector('.errorMess');

const getInform = async () => {
    const { data } = await axios.get('/admin/server');
    return data;
};

const renderCategoryOptions = async () => {
    const { category } = await getInform();
    const cards = category.reduce( (acc, item) => {
        acc = `${acc}<option value="${item._id}">${item.name}</option>`;
        return acc;
    }, '');
    categoryProdSelect.innerHTML = cards;
};

const renderEnterprizeOptions = async () => {
    const { enterprize } = await getInform();
    const cards = enterprize.reduce( (acc, item) => {
        acc = `${acc}<option value="${item._id}">${item.name}</option>`;
        return acc;
    }, '');
    nameEnterSelect.innerHTML = cards;
};

const rendersizeGridOptions = async () => {
    const { size } = await getInform();
    const cards = size.reduce( (acc, item) => {
        acc = `${acc}<option value="${item._id}">${item.name}</option>`;
        return acc;
    }, '');
    sizeProdSelect.innerHTML = cards;
};

const renderImageOptions = async () => {
    const { images } = await getInform();
    const cards = images.reduce( (acc, item) => {
        acc = `${acc}<option value="${item._id}">${item.name}</option>`;
        return acc;
    }, '');
    imageProdSelect.innerHTML = cards;
};


const productForm = document.forms.productForm;
productForm.addEventListener('submit', async (ev) => {
    ev.preventDefault();

    const formData = new FormData(ev.target);
    const { data } = await axios.post('/admin/product', formData);
    console.log('productForm: ', data);

    if(data.status === 'ok') {
        messAddElem.classList.remove('hidden');
    } else {
        errorMessElem.classList.remove('hidden');
    }
});

const run = () => {
    renderCategoryOptions();
    renderEnterprizeOptions();
    rendersizeGridOptions();
    renderImageOptions();
};
run();