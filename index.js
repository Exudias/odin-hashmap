class HashMap
{
    constructor(size, loadFactor)
    {
        this.length = 0;
        this.size = size;
        this.loadFactor = loadFactor;
        this.buckets = [];
        for (let i = 0; i < this.size; i++)
        {
            this.buckets[i] = new LinkedList();
        }
    }

    hash(key) 
    {
        let hashCode = 0;
            
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = primeNumber * hashCode + key.charCodeAt(i);
            hashCode = hashCode % this.size;
        }
        
        return hashCode;
    } 

    set(key, value)
    {
        let hashedKey = this.hash(key);

        // Check if key is in table
        let hasKey = false;
        let curr = this.buckets[hashedKey]._head;
        while (curr != null)
        {
            // If already in table, just amend the value
            if (curr.value[0] === key)
            {
                hasKey = true;
                curr.value = [key, value];
                break;
            }
            curr = curr.next;
        }

        // If key not in table, add 
        if (!hasKey)
        {
            this.buckets[hashedKey].append([key, value]);
            this.length++;
            if (this.length >= this.size * this.loadFactor)
            {
                this.size *= 2;
                let entries = this.entries();
                this.clear();
                for (let i = 0; i < entries.length; i++)
                {
                    this.set(entries[i][0], entries[i][1]);
                }
            }
        }
    }

    get(key)
    {
        let hashedKey = this.hash(key);

        let curr = this.buckets[hashedKey]._head;
        while (curr != null)
        {
            if (curr.value[0] === key)
            {
                return curr.value[1];
            }
            curr = curr.next;
        }
        return null;
    }

    remove(key)
    {
        let hashedKey = this.hash(key);

        if (this.buckets[hashedKey] === undefined) return false;

        let curr = this.buckets[hashedKey]._head;
        let idx = 0;
        while (curr != null)
        {
            if (curr.value[0] === key)
            {
                this.buckets[hashedKey].removeAt(idx);
                this.length--;
                return true;
            }
            curr = curr.next;
            idx++;
        }
        return false;
    }

    len()
    {
        return this.length;
    }

    clear()
    {
        for (let i = 0; i < this.size; i++)
        {
            this.buckets[i] = new LinkedList();
        }
        this.length = 0;
    }

    keys()
    {
        let out = [];

        for (let i = 0; i < this.size; i++)
        {
            let bucket = this.buckets[i];
            let curr = bucket._head;
            while (curr != null)
            {
                out.push(curr.value[0]);
                curr = curr.next;
            }
        }
        return out;
    }

    values()
    {
        let out = [];

        for (let i = 0; i < this.size; i++)
        {
            let bucket = this.buckets[i];
            let curr = bucket._head;
            while (curr != null)
            {
                out.push(curr.value[1]);
                curr = curr.next;
            }
        }
        return out;
    }

    entries()
    {
        let out = [];

        for (let i = 0; i < this.size; i++)
        {
            let bucket = this.buckets[i];
            if (bucket === undefined) break;
            let curr = bucket._head;
            while (curr != null)
            {
                out.push([curr.value[0], curr.value[1]]);
                curr = curr.next;
            }
        }
        return out;
    }
}

class LinkedList
{
    _head = null;

    head()
    {
        return this._head;
    }

    tail()
    {
        if (this._head === null) return null;

        let curr = this._head;
        while (curr.next != null)
        {
            curr = curr.next;
        }
        return curr;
    }

    size()
    {
        if (this._head === null) return 0;
        
        let curr = this._head;
        let counter = 0;
        while (curr != null)
        {
            curr = curr.next;
            counter++;
        }
        return counter;
    }

    append(value)
    {
        if (this._head === null)
        {
            this._head = new Node(value);
        }
        else
        {
            this.tail().next = new Node(value);
        }
    }

    prepend(value)
    {
        let newHead = new Node(value);
        newHead.next = this._head;
        this._head = newHead;
    }

    at(index)
    {
        if (index < 0) return null;
        let curr = this._head;
        for (let i = 0; i < index; i++)
        {
            curr = curr.next;
            if (curr === null) return null;
        }
        return curr;
    }

    pop()
    {
        if (this._head === null) return;

        let curr = this._head;
        let prev = null;
        while (curr.next != null)
        {
            prev = curr;
            curr = curr.next;
        }
        if (prev === null)
        {
            this._head = null;
        }
        else
        {
            prev.next = null;
        }
    }

    contains(value)
    {
        let curr = this._head;
        while (curr != null)
        {
            if (curr.value === value) return true;
            curr = curr.next;
        }
        return false;
    }

    find(value)
    {
        if (this._head === null) return null;

        let curr = this._head;
        let counter = 0;
        while (curr != null)
        {
            if (curr.value === value) return counter;
            curr = curr.next;
            counter++;
        }
        return null;
    }

    toString()
    {
        if (this._head === null) return "()";

        let curr = this._head;
        let output = '';
        while (curr != null)
        {
            output += `( ${curr.value} ) -> `;
            curr = curr.next;
        }
        output += 'null';
        return output;
    }

    insertAt(value, index)
    {
        if (index < 0) return;
        if (index === 0) this.prepend(value);
        
        let prev = this.at(index - 1);

        if (prev === null) return;

        let newNode = new Node(value);

        newNode.next = prev.next;
        prev.next = newNode;
    }

    removeAt(index)
    {
        if (index < 0) return;

        if (index === 0) this._head = this._head.next;

        let prev = this.at(index - 1);

        if (prev === null || prev.next === null) return;

        prev.next = prev.next.next;
    }
}

class Node
{
    value = null;
    next = null;

    constructor(val)
    {
        this.value = val;
    }
}

let map = new HashMap(16, 0.75);
map.set("Bomba", "Clat");
map.set("Bomba", "Cl23t");
map.set("Bimba", "Clat");
map.set("Bimb11111i", "Clat");
map.set("Bimb111i", "Clat");
map.set("Bimb111i", "Cl1235t");

for (let i = 0; i < 30; i++)
{
    map.set(`Hell${i}`, "Shlink!");
    console.log(map.len());
    console.log(map.entries());
}

console.log(map);
console.log(map.keys());
