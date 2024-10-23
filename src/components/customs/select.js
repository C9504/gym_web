const defaultStyeSelect = { option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused ? '#b00020' : null, // Cambiar color en hover
    color: state.isFocused ? 'white' : 'black', // Color del texto
    padding: 10,
  }), control: (baseStyles, state) => ({ ...baseStyles, borderColor: state.isFocused ? 'black' : '#b00020' }) };

export { defaultStyeSelect };