export default(_, inject) => {
  inject('formatDate', (date) => {
    const {ano, mes, dia} = date.split('-')
    return `${dia}/${mes}/${ano}`;
  });
}

this.$formatDate('2021-01-01')