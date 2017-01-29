export function slicePaginationBoxes(arr, paginationIDX) {
    /*const {paginationIDX} = this.state;*/
    const spread = 6;
    const maxPages = 10;

    //to have some previous pages. Show paginationIDX - delta if it is not less then 0(first elem)
    const firstPageRange = paginationIDX - spread < 0 ? 0 : paginationIDX - spread;
    const lastPageRange = paginationIDX + spread < maxPages ? maxPages : paginationIDX + spread;
    const lastPage = arr.length;

    let slicedArray = arr;

    //if array is bigger than maxPages slice it
    if (lastPage > maxPages) {
        slicedArray = arr.slice(firstPageRange, lastPageRange);

        //if the first elem not 1, add ref to 1 and dots
        if (slicedArray[0] && slicedArray[0] !== 1) {
            //check not to add dots between 1 and 2
            if (slicedArray[0] !== 2) slicedArray.unshift("...");
            slicedArray.unshift(1);
        }

        //if the last elem is not visible, add dots
        if (slicedArray[slicedArray.length-1] !== lastPage) slicedArray.push("...");
    }

    return slicedArray
};
