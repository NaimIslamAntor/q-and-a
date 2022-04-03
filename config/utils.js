
//paginationPageDefiner defines pages for any model pagination

const paginationPageDefiner = async (model, limit=10, page) => {

    const totalQuestion = await model.count()

    const numOfPages = Math.ceil(totalQuestion / limit) - 1

    const pages = {
        prev: null,
        next: null,
    }

    //sets prev page
    if (page > 0) {
        let prevPage = page - 1
        pages.prev = prevPage ? `/?page=${prevPage}` : '/'
    }

    //sets next page
    if (page < numOfPages) {
        let nextPage = page + 1
        pages.next = `/?page=${nextPage}`
    }


    return pages
}


module.exports = { paginationPageDefiner }