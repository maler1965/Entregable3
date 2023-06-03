
export const paginationLogic = (currentPage, residents) => {

    if (!residents) {

        return {
            pages: [1],
            residentsInPage: []
        }
    }


    //Cantidad de residentes por paginas
    const RESIDENTS_PER_PAGE = 20

    //Cantidad totol de paginas
    const totalPages = Math.ceil(residents.length / RESIDENTS_PER_PAGE)

    //Residentes que se van a mostrar en la pagina actual
    const sliceStart = (currentPage - 1) * RESIDENTS_PER_PAGE
    const sliceEnd = sliceStart + RESIDENTS_PER_PAGE
    const residentsInPage = residents.slice(sliceStart, sliceEnd)

    //generacion del arreglo de las paginas que se van a mostrar
    let pages = []

    for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
    }

    return {
        pages, residentsInPage
    }



}