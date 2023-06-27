
const productsContiner = document.getElementById('productsContiner')
const detailContiner = document.getElementById('detailContiner')
const selectElements = document.getElementById('selectElements')
const searching = document.getElementById('searching')
const spinner = document.getElementById('spinner')

let allProducts = [];

// fecht product
const fetchProduct = async (selected) => {
    spinner.classList.remove('hidden')
    try {
        const resp = await fetch(selected === 'all' ? `https://dummyjson.com/products` : `https://dummyjson.com/products/category/${selected}`)
        const data = await resp.json()
        allProducts = [...data.products]
        showProduct(allProducts);
    } catch (error) {
        console.log(error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    fetchProduct('all')
    fetchCategory()
})

// elements show on dispaly
function showProduct(data) {
    productsContiner.innerHTML = ''
    data.map(data => {
        const product = document.createElement('div')
        product.className = 'flex border dark:border-white/10 border-black/10  flex-col gap-4 transition-all  rounded-md overflow-hidden bg-white dark:bg-slate-800'
        product.innerHTML = `
                <div class='aspect-[3/2]   w-full overflow-hidden cursor-pointer group'>
                    <img class='w-full h-full object-cover object-center' src=${data.thumbnail} alt="" />
                </div>
                <div class="flex flex-col flex-1 p-4 gap-2">
                    <h1 class='text-lg font-bold text-slate-900 dark:text-white'>${data.title}</h1>
                    <p class='font-semibold text-cyan-500'>$${data.price}</p>
                    <p class='font-semibold text-slate-900 dark:text-white'><span class="font-semibold">Stock: </span>${data.stock}</p>
                    <p class='text-base text-slate-500 dark:text-slate-400'>${data.description}</p>
                    <button class='bg-cyan-500 text-white py-2 px-3 text-center mt-auto rounded detail'>Details</button>
                </div>
    `
        productsContiner.appendChild(product)
        product.addEventListener('click', (e) => {
            if (e.target.classList.contains('detail')) {
                detailPage(data)
            }
        })
    })
    spinner.classList.add('hidden')
}

// fecht category
const fetchCategory = async () => {
    try {
        const resp = await fetch(`https://dummyjson.com/products/categories`)
        const data = await resp.json()
        const category = ['all', ...data]
        showCategory(category)
        // return products
    } catch (error) {
        console.log(error);
    }
}

// ctegory show on display
function showCategory(category) {
    let res = ''
    category.map(category => {
        res += `
        <option class="text-slate-500 dark:text-slate-400 dark:bg-slate-900" value=${category}>${category}</option>
    `
    })
    selectElements.innerHTML = res
}

// filtering select
selectElements.addEventListener('change', () => {
    fetchProduct(selectElements.value)
})


// searching porduct
searching.addEventListener('input', (e) => {
    let inpValue = e.target.value.toLowerCase()
    const searchinProduct = allProducts.filter(items=>{
        if(items.title.toLowerCase().includes(inpValue)) return items
    })
    showProduct(searchinProduct)
})

// detail page
function detailPage(data) {
    detailContiner.classList.remove('hidden')
    detailContiner.innerHTML = `
    <div class='flex flex-col sm:flex-row transition-all border dark:border-white/10 border-black/10 gap-3 shadow-md  rounded-md overflow-hidden bg-white/10' >
        <div class='aspect-[3/2] overflow-hidden cursor-pointer group'>
            <img class='w-full h-full object-cover object-center' src=${data.thumbnail} alt="" />
        </div>
        <div class="flex flex-col p-4 gap-2 pt-5 flex-1">
            <h1 class='text-3xl font-bold text-slate-900 dark:text-white'>${data.title}</h1>
            <p class='font-bold text-slate-900 dark:text-white'><span class="font-semibold">Brand:</span> ${data.brand}</p>
            <p class='font-semibold text-cyan-500'><span class="font-semibold">Price:</span> $${data.price}</p>
            <p class='font-semibold text-yellow-500'><span class="font-semibold">Stock: </span>${data.stock}</p>
            <p class='text-slate-500 dark:text-slate-400'><span class="font-semibold">Descritption:</span> ${data.description}</p>
            <button class="bg-red-500 text-white sm:w-32 py-2 px-3 text-center sm:ml-auto mt-auto rounded back">Back</button>
        </div>
    </div>
    `
    const back = document.querySelector('.back')
    back.addEventListener('click', () => {
        detailContiner.classList.add('hidden');
    })
}
