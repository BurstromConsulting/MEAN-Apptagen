// Exported function to be used globally in project to remove a single element from a given array to allow for less code on the sub-pages.
// More functions could be moved to this Page
//To-do: Clean-up code functionality on sub-pages and move global functions or code being repeated to App.constants and reference them from here.
export function removeElement(array: any[], element: any){
    array.splice(array.indexOf(element), 1);
}