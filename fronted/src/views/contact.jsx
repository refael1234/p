
import '../css/Contact.css'; 
export function Contact (){
    const onSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
    
       
        formData.append("access_key", "0e2ea3c6-0238-453b-b9a7-506d283fa2cc");
    
        const object = Object.fromEntries(formData);
        const json = JSON.stringify(object);
    
        const res = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          body: json
        }).then((res) => res.json());
    
        if (res.success) {
          console.log("Success", res);
          alert("Your message has been sent successfully!");
          event.target.reset();
        } else {
          console.log("Error", res);
          alert("There was an error sending your message.");
        }
      };
    
      return (
        <div className="connect-container">
          <h2>Connect with Us</h2>
          <form onSubmit={onSubmit} className="connect-form">
            <div>
              <p>  
              <label htmlFor="name">Name:</label>
              <input type="text" name="name" required />
              </p>
            </div>
            <div>
              <p> 
              <label htmlFor="email">Email:</label>
              <input type="email" name="email" required />
              </p> 
            </div>
            <div>
              <p>  
              <label htmlFor="message">Message:</label>
              <textarea name="message" required></textarea>
              </p> 
            </div>
            <button type="submit">Submit Form</button>
          </form>
        </div>
      );
    }
