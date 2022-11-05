import Swal from 'sweetalert2';

export const popUpSuccess = (title) => {
  const resp = Swal.fire({
    title,
    icon: 'success',
    confirmButtonColor: '#3085d6',
    confirmButtonText: 'OK'
  });
  
  return resp;
}

export const popUpDialog = (title) => {
  const resp = Swal.fire({
    title,
    showCancelButton: true,
    confirmButtonText: 'Borrar',
    denyButtonText: `Cancelar`,
  })
  
  return resp;
}