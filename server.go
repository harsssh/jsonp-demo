package main

import (
	"encoding/json"
	"fmt"
	"net/http"
)

type Recommendation struct {
	ID          int    `json:"id"`
	Title       string `json:"title"`
	Description string `json:"description"`
}

func handleJSONP(w http.ResponseWriter, r *http.Request) {
	callback := r.URL.Query().Get("callback")
	recommendations := []Recommendation{
		{
			ID:          1,
			Title:       "Sample Title 1",
			Description: "Sample Description 1",
		},
		{
			ID:          2,
			Title:       "Sample Title 2",
			Description: "Sample Description 2",
		},
	}

	data, _ := json.Marshal(recommendations)

	w.Header().Set("Content-Type", "application/javascript")
	fmt.Fprintf(w, "%s(%s);", callback, data)
}

func main() {
	http.HandleFunc("/recommendations", handleJSONP)
	http.ListenAndServe(":3000", nil)
}
