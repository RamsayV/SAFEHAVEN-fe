import { MarkerData } from "./components/LeafletComponents/LocationMarkers";
import { RegisterFormData } from "./pages/Register";
import { SignInFormData } from "./pages/SignIn";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL


//REGISTRATION AND AUTH routes PLUS BE ROUTE PROTECTION logic

export const register = async (formData:RegisterFormData) => {
    const response = await fetch(`${API_BASE_URL}/api/users/register`, {
        method: 'POST',
        credentials: "include",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(formData)
    });
    const responseBody = await response.json()

    if(!response.ok){
        throw new Error(responseBody.message)
    }
}

export const signIn = async (formData: SignInFormData) => {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
  
    const body = await response.json();
    if (!response.ok) {
      throw new Error(body.message);
    }
    return body;
  };


export const validateToken = async () => {
    const response = await fetch(`${API_BASE_URL}/api/auth/validate-token`, {
        credentials: "include"
    })

    if(!response.ok){
        throw new Error("token invalid")
    }

    return response.json()
}

export const signOut = async() => {
  const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
    credentials: "include",
    method: "POST"
  })

  if(!response.ok){
    throw new Error("Error during sign out")
  }
}

//Memory MAP api routes

 
export const fetchMarkers = async (): Promise<MarkerData[]> => {
  const response = await fetch(`${API_BASE_URL}/api/markers/fetch`);

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return response.json();
};

export const addMarker = async (marker: MarkerData): Promise<MarkerData> => {
  const response = await fetch(`${API_BASE_URL}/api/markers/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(marker),
  });

  if (!response.ok) {
    throw new Error('Something went wrong with the POST request');
  }

  return response.json();
};

export const deleteMarker = async (id: string): Promise<{ message: string }> => {
  const response = await fetch(`${API_BASE_URL}/api/markers/delete/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Something went wrong with the DELETE request');
  }

  return response.json();
};   

export const updateMarker = async (id: string, updatedMarkerData: MarkerData): Promise<MarkerData> => {
  const response = await fetch(`${API_BASE_URL}/api/markers/update/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedMarkerData),
  });

  if (!response.ok) {
    throw new Error('Something went wrong with the PUT request');
  }

  return response.json();
};