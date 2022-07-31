// import Text "mo:base/Text"

module {
   public type Customer = {
      name: Text;
      birthday:  Text;
      phone: Text;
      sex: Text;
      address: Text;
   };

   // public func equal(c1 : Customer, c2 : Customer) : Bool {
   //    let isEqual = Text.equal(c1.name,c2.name)
   //                   and Text.equal(c1.birthday,c2.birthday)
   //                   and Text.equal(c1.phone,c2.phone)
   //                    and Text.equal(c1.sex,c2.sex)
   //                     and Text.equal(c1.address,c2.address)
   //    return isEqual;
   // }
}