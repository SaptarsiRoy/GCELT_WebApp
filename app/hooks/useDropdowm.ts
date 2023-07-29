interface Dropdownlist {
    label?: string;
    description?: string;
}

const useDropdown = (array: Dropdownlist[]) => {

    const formattedStreams = array.map((items) => ({
        label: items.label,
    }));
    const getAll = () => formattedStreams;

    //   const getByValue = (value: string) => {
    //     return formattedStreams.find((item) => item.value === value);
    //   }

    return {
        getAll,
        // getByValue
    }
};

export default useDropdown;