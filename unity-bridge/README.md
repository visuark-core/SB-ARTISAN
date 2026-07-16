# Unity ↔ Node Backend Integration Guide

This bridge allows your Unity 3D interactive showroom to fetch real-time catalog data from your Node/Express/PostgreSQL backend, submit B2B trade inquiries directly to the database, and communicate user actions between Unity and your React/Vite frontend.

---

## 📂 File Directory

1. **[BackendService.cs](file:///home/tony/sb-artisan/unity-bridge/BackendService.cs)**: C# Singleton script utilizing `UnityWebRequest` to handle REST API calls to the Express backend (`/api/products` and `/api/inquiries`).
2. **[WebGLBridge.jslib](file:///home/tony/sb-artisan/unity-bridge/WebGLBridge.jslib)**: A Javascript plugin allowing Unity to dispatch custom DOM events that your React/Vite web application can listen to.

---

## 🚀 1. Unity Setup (C#)

### Importing Files
1. Copy **`BackendService.cs`** into your Unity Project's `Assets/Scripts` folder.
2. Create a folder named **`Plugins`** directly inside your `Assets` directory (i.e., `Assets/Plugins/`) and place **`WebGLBridge.jslib`** inside it.

### Using BackendService.cs
Attach the `BackendService` script to a persistent GameObject (e.g., an empty GameObject named `BackendManager`) in your Unity Hierarchy.

#### Fetching Products (GET `/api/products`)
```csharp
BackendService.Instance.GetProducts(
    onSuccess: (products) => {
        foreach (var product in products) {
            Debug.Log($"Fetched: {product.name} (Price: {product.price})");
            // Instantiate 3D models, assign textures, or update catalog UI
        }
    },
    onError: (error) => {
        Debug.LogError($"Failed to load products: {error}");
    }
);
```

#### Submitting Trade Inquiry (POST `/api/inquiries`)
```csharp
BackendService.Inquiry myInquiry = new BackendService.Inquiry() {
    name = "Sarah Connor",
    company_name = "Cyberdyne Systems",
    email = "sarah@cyberdyne.com",
    phone = "555-0199",
    country = "USA",
    message = "Requesting custom metal finish details.",
    inquiry_type = "B2B Trade"
};

BackendService.Instance.SubmitInquiry(myInquiry,
    onSuccess: (response) => {
        Debug.Log($"Inquiry submitted! ID: {response.data.id}");
    },
    onError: (error) => {
        Debug.LogError($"Submission failed: {error}");
    }
);
```

---

## 🌐 2. Browser Integration (JS Bridge)

### Calling JavaScript from Unity C#
To use the methods declared in `WebGLBridge.jslib` inside Unity, declare them as external functions in your C# scripts:

```csharp
using System.Runtime.InteropServices;
using UnityEngine;

public class UnityUIController : MonoBehaviour
{
    // Declare the JavaScript plugin functions
    [DllImport("__Internal__")]
    private static extern void NotifyProductSelected(int productId, string productSlug);

    [DllImport("__Internal__")]
    private static extern void NotifySceneLoaded();

    [DllImport("__Internal__")]
    private static extern void OpenInquiryModal(string productName);

    public void OnProductClickedIn3D(int id, string slug)
    {
        #if UNITY_WEBGL && !UNITY_EDITOR
        NotifyProductSelected(id, slug);
        #else
        Debug.Log($"Local click: {slug}");
        #endif
    }
}
```

---

## ⚛️ 3. Frontend Integration (React/Vite)

In your Vite frontend application, embed the Unity WebGL build and listen to the custom events dispatched from the `WebGLBridge.jslib` script:

### A. Listening to Unity Events in React
```jsx
import { useEffect } from 'react';

function ShowroomPage() {
  useEffect(() => {
    // Handle product selections from Unity
    const handleProductSelect = (event) => {
      const { id, slug } = event.detail;
      console.log(`React received product selection: ${slug} (ID: ${id})`);
      // Update React UI sidebars, details panels, etc.
    };

    // Handle inquiry modal open requests from Unity
    const handleRequestInquiry = (event) => {
      const { productName } = event.detail;
      // Open inquiry popup form in React with the prefilled product name
    };

    window.addEventListener("unityProductSelected", handleProductSelect);
    window.addEventListener("unityRequestInquiry", handleRequestInquiry);

    return () => {
      window.removeEventListener("unityProductSelected", handleProductSelect);
      window.removeEventListener("unityRequestInquiry", handleRequestInquiry);
    };
  }, []);

  return (
    <div className="showroom-container">
      <iframe src="/unity-build/index.html" width="100%" height="600px" title="Unity 3D Showroom" />
    </div>
  );
}
```

### B. Calling Unity Methods from React (Host to Unity)
If you want to trigger changes inside the Unity scene (e.g. changing the wood finish of a selected model from React UI buttons), grab the Unity instance and call `SendMessage`:

```javascript
// React Button Handler
const changeWoodFinish = (colorHex) => {
  if (window.unityInstance) {
    // Message syntax: GameObjectName, C# MethodName, Argument/Value
    window.unityInstance.SendMessage("3DModelController", "ApplyMaterialColor", colorHex);
  }
};
```
*Note: Make sure your Unity WebGL build template assigns the generated Unity instance to `window.unityInstance` during initialization.*
