/* TempleJS v0.1 - Straight forward HTML5 template engine */

temple =
{
	clone: function(template, index, value)
	{
		// setup instance
		var instance = document.createElement('div');
		instance.setAttribute('data-temple', '');
		if (template.dataset.class)
			instance.className = template.dataset.class;
		instance.id = template.id + index;

		// clone template
		instance.appendChild(document.importNode(template.content, true));

		// evaluate data values
		var children = instance.querySelectorAll('[data-value]');
		for(var j = 0; j < children.length; j++)
		{
			var child = children[j];
			child.textContent = eval(child.dataset.value);
		}

		this.appendChild(instance);
	},

	apply: function()
	{
		if (!this.dataset.source || !this.dataset.template)
			return;

		// object array to iterate (convert if not array)
		var data = eval(this.dataset.source);
		if (!Array.prototype.isPrototypeOf(data))
			data = [ data ];

		// template to use
		var template = document.getElementById(this.dataset.template);

		for(var i in data)
			temple.clone.call(this, template, i, data[i]);

		return $(this);
	},

	onload: function()
	{
		$('[data-template][data-onload]').temple();
	}
};

templeExtensions =
{
	temple: function()
	{
		$(this).each(temple.apply);
		return $(this);
	},

	untemple: function()
	{
		$('[data-temple]', this).remove();
		return $(this);
	},

	retemple: function()
	{
		return $(this).untemple().temple();
	}
};

$.fn.extend(templeExtensions);
$(document).ready(temple.onload);
