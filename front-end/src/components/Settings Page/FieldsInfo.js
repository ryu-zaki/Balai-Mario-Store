  const CreateInfoObj = (label, example, type) => {

    return ({
        label, 
        example,
        type

    })
  }

export const basic_info = [
    CreateInfoObj("First Name", "Jhonwell", "firstName"),
    CreateInfoObj("Last Name", "Espanola", "lastName"),
    CreateInfoObj("Phone Number", "09514406062", "phoneNumber"),
    CreateInfoObj("Email", "jhonwellespanola4@gmail.com", "email")
]

export const shipping_info = [
    CreateInfoObj("Street Address", "Blk 50 Lot 9 Northville 2b", "streetAddress"),
    CreateInfoObj("State/Province", "Metro Manila", "province"),
    CreateInfoObj("City", "Caloocan City", "city"),
    CreateInfoObj("ZIP/Postal Code", "1400", "zip")
]