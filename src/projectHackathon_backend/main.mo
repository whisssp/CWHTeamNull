import C "customer";
import HashMap "mo:base/HashMap";
import Hash "mo:base/Hash";
import Array "mo:base/Array";
import Iter "mo:base/Iter";
import Nat "mo:base/Nat";

actor {
   public type Customer = C.Customer;
   var t: Nat = 0;
   stable var id : Nat = 1;
   stable var entries : [(Nat,Customer)] = [];
   let listCustomer = HashMap.fromIter<Nat,Customer>(Iter.fromArray<(Nat,Customer)>(entries),0,Nat.equal,Hash.hash);
   public func createAccount(customer : Customer) : async () {
      listCustomer.put(id,customer);
      id := listCustomer.size() + 1;
   };

   public func readAccount(id : Nat) : async ?Customer {
      return listCustomer.get(id);
   };

   public func getListCustomer() : async [(Nat,Customer)] {
      return Iter.toArray(listCustomer.entries());
   };

   public func updateAccount(id: Nat,customer : Customer) : async Bool{
      switch  (listCustomer.get(id)) {
         case (null) {
            return false;
         };
         case(?c) {
            var t = listCustomer.replace(id,customer);
            return true;
         };
      };
   };

   public func deleteAccount(id: Nat) : async Bool{
       switch  (listCustomer.get(id)) {
            case (null) {
               return false;
            };
            case(?c) {
               var t = listCustomer.remove(id);
               return true;
            };
       };
   };

   system func preupgrade() {
        entries := Iter.toArray(listCustomer.entries());
    }; 
};
