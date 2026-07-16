using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Networking;

public class BackendService : MonoBehaviour
{
    [Header("API Settings")]
    [SerializeField] private string backendBaseUrl = "http://localhost:5000/api";

    // Singleton Pattern
    public static BackendService Instance { get; private set; }

    private void Awake()
    {
        if (Instance == null)
        {
            Instance = this;
            DontDestroyOnLoad(gameObject);
        }
        else
        {
            Destroy(gameObject);
        }
    }

    #region Data Structures for JSON Serialization
    
    [Serializable]
    public class Product
    {
        public int id;
        public int category_id;
        public int subcategory_id;
        public string name;
        public string slug;
        public string description;
        public string material;
        public string dimensions;
        public string price;
        public int featured;
        public string category_name;
        public string subcategory_name;
        public string primary_image;
    }

    [Serializable]
    public class ProductListResponse
    {
        public bool success;
        public List<Product> data;
    }

    [Serializable]
    public class Inquiry
    {
        public string name;
        public string company_name;
        public string email;
        public string phone;
        public string country;
        public string message;
        public string inquiry_type;
    }

    [Serializable]
    public class InquiryResponseData
    {
        public int id;
        public string name;
        public string company_name;
        public string email;
        public string status;
    }

    [Serializable]
    public class InquiryResponse
    {
        public bool success;
        public InquiryResponseData data;
        public string message;
    }

    #endregion

    #region GET Products API

    /// <summary>
    /// Fetches all contract-grade products from the backend database.
    /// </summary>
    public void GetProducts(Action<List<Product>> onSuccess, Action<string> onError)
    {
        StartCoroutine(GetProductsCoroutine(onSuccess, onError));
    }

    private IEnumerator GetProductsCoroutine(Action<List<Product>> onSuccess, Action<string> onError)
    {
        string url = $"{backendBaseUrl}/products";
        using (UnityWebRequest webRequest = UnityWebRequest.Get(url))
        {
            yield return webRequest.SendWebRequest();

            if (webRequest.result == UnityWebRequest.Result.Success)
            {
                try
                {
                    string jsonResponse = webRequest.downloadHandler.text;
                    ProductListResponse response = JsonUtility.FromJson<ProductListResponse>(jsonResponse);
                    if (response != null && response.success)
                    {
                        onSuccess?.Invoke(response.data);
                    }
                    else
                    {
                        onError?.Invoke("API response indicated failure.");
                    }
                }
                catch (Exception ex)
                {
                    onError?.Invoke($"Failed to parse JSON response: {ex.Message}");
                }
            }
            else
            {
                onError?.Invoke($"Error fetching products: {webRequest.error} (Code: {webRequest.responseCode})");
            }
        }
    }

    #endregion

    #region POST Trade Inquiry API

    /// <summary>
    /// Submits a trade inquiry from the Unity interactive scene to the database.
    /// </summary>
    public void SubmitInquiry(Inquiry inquiry, Action<InquiryResponse> onSuccess, Action<string> onError)
    {
        StartCoroutine(SubmitInquiryCoroutine(inquiry, onSuccess, onError));
    }

    private IEnumerator SubmitInquiryCoroutine(Inquiry inquiry, Action<InquiryResponse> onSuccess, Action<string> onError)
    {
        string url = $"{backendBaseUrl}/inquiries";
        string jsonPayload = JsonUtility.ToJson(inquiry);

        using (UnityWebRequest webRequest = new UnityWebRequest(url, "POST"))
        {
            byte[] bodyRaw = System.Text.Encoding.UTF8.GetBytes(jsonPayload);
            webRequest.uploadHandler = new UploadHandlerRaw(bodyRaw);
            webRequest.downloadHandler = new DownloadHandlerBuffer();
            webRequest.SetRequestHeader("Content-Type", "application/json");

            yield return webRequest.SendWebRequest();

            if (webRequest.result == UnityWebRequest.Result.Success)
            {
                try
                {
                    string jsonResponse = webRequest.downloadHandler.text;
                    InquiryResponse response = JsonUtility.FromJson<InquiryResponse>(jsonResponse);
                    if (response != null && response.success)
                    {
                        onSuccess?.Invoke(response);
                    }
                    else
                    {
                        onError?.Invoke(response?.message ?? "API response indicated failure.");
                    }
                }
                catch (Exception ex)
                {
                    onError?.Invoke($"Failed to parse JSON response: {ex.Message}");
                }
            }
            else
            {
                onError?.Invoke($"Error submitting inquiry: {webRequest.error} (Code: {webRequest.responseCode})");
            }
        }
    }

    #endregion
}
