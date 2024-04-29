// This solution is based on the given condition:
// "el valor de cada elemento es proporcional a su peso" which means that the heavier the object,
// the more valuable it is, and the lighter the object, the less valuable it is.
// With that assumption one can solve this otherwise NP-Hard problem efficiently.


import java.util.*;

public class Main {
    public static void main(String[] args) {
        ArrayList<Item> items = new ArrayList<>();
        items.add(new Item(2, 3));
        items.add(new Item(3, 4));
        items.add(new Item(4, 5));
        items.add(new Item(5, 6));
        Solution(items, 8);
    }

    public static void Solution(ArrayList<Item> items, int capacity) {
        ArrayList<Item> packedItems = new ArrayList<>();
        ArrayList<Item> unusedItems = new ArrayList<>();
        sortItems(items);
        int accumulatedWeight = 0;
        int totalValue = 0;
        int unusedItemsTotalValue = 0;
        for (Item item : items) {
            if (accumulatedWeight + item.getWeight() <= capacity) {
                packedItems.add(item);
                accumulatedWeight += item.getWeight();
                totalValue += item.getValue();
            }
            else {
                unusedItems.add(item);
                unusedItemsTotalValue += item.getValue();
            }
        }
        System.out.print("La combinación óptima de elementos es ");
        for (Item item: packedItems) {
            System.out.print(item + " ");
        }
        System.out.println("y el valor total es " + totalValue);
        System.out.print("Los elementos que no se usaron son ");
        for (Item item: unusedItems) {
            System.out.print(item + " ");
        }
        System.out.println("y el valor total es " + unusedItemsTotalValue);
    }

    public static void sortItems(ArrayList<Item> items) {
        items.sort(new Comparator<Item>() {
            @Override
            public int compare(Item o1, Item o2) {
                return o2.getWeight().compareTo(o1.getWeight());
            }
        });
    }
}

class Item {
    private Integer weight;
    private Integer value;

    public Item(Integer weight, Integer value) {
        this.weight = weight;
        this.value = value;
    }

    public Integer getWeight() {
        return weight;
    }

    public Integer getValue() {
        return value;
    }
    @Override
    public String toString() {
        return "(" + this.weight + "," + this.getValue() + ")";
    }
}