function Person(name, age, bio)
{
	this.Name = name;
	this.Age = age;
	this.Bio = bio;
	this.Skills = [];
}

function Skill(title, description)
{
	this.Title = title;
	this.Description = description;
}

var testPeople =
[
	new Person('Nick Bedford', 27, 'Nick is a photographer.'),
    new Person('Nathaniel Dash', 27, '<p>Nathaniel is a JavaScript programmer.</p><p>He also has a dog named Cooper.</p>')
];

testPeople[0].Skills = [ new Skill('C#', 'C# .NET programming'), new Skill('PHP', 'PHP MVC programming') ];
testPeople[1].Skills = [ new Skill('C++', 'C++ programming'), new Skill('JavaScript', 'JavaScript programming') ];
