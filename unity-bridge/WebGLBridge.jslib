mergeInto(LibraryManager.library, {
  
  // Notify the parent web app that a product was clicked or selected in the 3D viewer
  NotifyProductSelected: function (productId, productSlugPtr) {
    var slug = UTF8ToString(productSlugPtr);
    console.log("[Unity WebGL] Product Selected - ID: " + productId + ", Slug: " + slug);
    
    // Dispatch a custom window event that the parent React/Vite page can listen for
    var event = new CustomEvent("unityProductSelected", {
      detail: { id: productId, slug: slug }
    });
    window.dispatchEvent(event);
  },

  // Notify the parent web app that a 3D assets/scene finished loading
  NotifySceneLoaded: function () {
    console.log("[Unity WebGL] 3D Showroom Scene Fully Loaded.");
    var event = new CustomEvent("unitySceneLoaded");
    window.dispatchEvent(event);
  },

  // Open the inquiry modal inside the web app for a specific product
  OpenInquiryModal: function (productNamePtr) {
    var name = UTF8ToString(productNamePtr);
    console.log("[Unity WebGL] Requesting Inquiry Modal for: " + name);
    
    var event = new CustomEvent("unityRequestInquiry", {
      detail: { productName: name }
    });
    window.dispatchEvent(event);
  }

});
